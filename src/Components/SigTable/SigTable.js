import './SigTable.scss';

import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import { Pagination, PaginationVariant } from '@patternfly/react-core/dist/esm/components/Pagination/index';
import React, { useEffect, useReducer } from 'react';
import {
    SortByDirection,
    Table,
    TableBody,
    TableHeader,
    cellWidth,
    expandable,
    sortable
} from '@patternfly/react-table/dist/esm/components/Table/index';
import { Text, TextVariants } from '@patternfly/react-core';

import CodeEditor from '../CodeEditor/CodeEditor';
import { DateFormat } from '@redhat-cloud-services/frontend-components/components/DateFormat';
import { GET_SIGNATURE_TABLE } from '../../operations/queries';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import MessageState from '../MessageState/MessageState';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/components/PrimaryToolbar';
import StatusLabel from '../StatusLabel/StatusLabel';
import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/Tooltip';
import { gqlProps } from '../Common';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';

const initialState = {
    tableVars: {
        limit: 10,
        offset: 0,
        orderBy: 'CREATED_AT_ASC',
        ruleName: ''
    },
    sortBy: {
        index: 4,
        direction: SortByDirection.asc
    },
    rows: []
};
const sortIndices = { 2: 'IS_DISABLED', 3: 'HOST_COUNT', 4: 'CREATED_AT', 5: 'HAS_MATCH' };
const orderBy = ({ index, direction }) => `${sortIndices[index]}_${direction === SortByDirection.asc ? 'ASC' : 'DESC'}`;

const tableReducer = (state, action) => {
    switch (action.type) {
        case 'setTableVars':
            return { ...state, tableVars: { ...state.tableVars, ...action.payload } };
        case 'setSortBy':
            return { ...state, sortBy: action.payload, tableVars: { ...state.tableVars, ...action.tableVars } };
        case 'setRows':
            return { ...state, rows: action.payload };
    }

    return state;
};

const SigTable = () => {
    const intl = useIntl();
    const [{ tableVars, sortBy, rows }, stateSet] = useReducer(tableReducer, {
        ...initialState
    });
    const { data: sigTableData, loading: sigTableLoading, error: sigTableError } =
        useQuery(GET_SIGNATURE_TABLE, { variables: tableVars });
    const columns = [
        { title: intl.formatMessage(messages.sigNameId), cellFormatters: [expandable], transforms: [cellWidth(45)] },
        { title: intl.formatMessage(messages.status), transforms: [sortable] },
        { title: intl.formatMessage(messages.systems), transforms: [sortable] },
        { title: intl.formatMessage(messages.added), transforms: [sortable] },
        { title: intl.formatMessage(messages.matched), transforms: [sortable] }
    ];

    const page = tableVars.offset / tableVars.limit + 1;

    const onCollapse = (e, rowKey, isOpen) => {
        const collapseRows = [...rows];
        collapseRows[rowKey] = { ...collapseRows[rowKey], isOpen };
        stateSet({ type: 'setRows', payload: collapseRows });
    };

    const filterConfigItems = [{
        label: intl.formatMessage(messages.signature).toLowerCase(),
        filterValues: {
            key: 'text-filter',
            onChange: (e, value) => stateSet({ type: 'setTableVars', payload: { ruleName: value } }),
            value: tableVars.ruleName,
            placeholder: intl.formatMessage(messages.filterBy, { field: intl.formatMessage(messages.signature).toLowerCase() })
        }
    }];

    const onSetPage = (e, page) => stateSet({ type: 'setTableVars', payload: { offset: page * tableVars.limit - tableVars.limit } });

    const onPerPageSelect = (e, perPage) => stateSet({ type: 'setTableVars', payload: { limit: perPage, offset: 0 } });

    const onSort = (e, index, direction) =>
        stateSet({ type: 'setSortBy', payload: { index, direction }, tableVars: { orderBy: orderBy({ index, direction }), offset: 0 } });

    useEffect(() => {
        const rowBuilder = data => data?.rulesList?.flatMap((data, key) => {
            const sig = data;
            return [{
                rowId: key,
                isOpen: false,
                cells: [
                    { title: <Link to={`/${sig.name}`}>{sig.name}</Link> },
                    { title: <span><StatusLabel {...sig} /></span> },
                    { title: <span>{sig.hostCount}</span> },
                    { title: <span>{sig.metadata.date}</span> },
                    {
                        title: sig.lastMatchDate ?
                            <DateFormat date={new Date(sig.lastMatchDate)} type="onlyDate" />
                            : <Tooltip content={intl.formatMessage(messages.noSystemHas)}>
                                <span>{intl.formatMessage(messages.never)}</span>
                            </Tooltip>
                    }]
            }, {
                parent: key * 2,
                fullWidth: true,
                cells: [{
                    title: <Grid hasGutter>
                        <GridItem span={6}><CodeEditor code={sig.rawRule} codeType='XML' /></GridItem>
                        <GridItem span={6}> <Text className='ins-l-sigtable--title' component={TextVariants.h6}>
                            {intl.formatMessage(messages.description)}
                        </Text>{sig.metadata.description}
                        </GridItem>
                    </Grid>
                }]
            }];
        });

        stateSet({ type: 'setRows', payload: rowBuilder(sigTableData) });
    }, [intl, sigTableData]);

    return <React.Fragment>
        <PrimaryToolbar
            pagination={{
                itemCount: sigTableData?.rules?.totalCount || 0,
                page,
                perPage: tableVars.limit,
                onSetPage(e, page) { onSetPage(e, page); },
                onPerPageSelect(e, perPage) { onPerPageSelect(e, perPage); },
                isCompact: true
            }}
            filterConfig={{ items: filterConfigItems }}
        />
        <Table className='sigTable' aria-label="Signature table"
            onCollapse={onCollapse}
            rows={rows} cells={columns}
            onSort={onSort} sortBy={sortBy}>
            <TableHeader />
            <TableBody />
        </Table>
        {sigTableLoading && <Loading type='table' />}
        {!sigTableLoading && !sigTableError && sigTableData?.rules?.length === 0 &&
            <MessageState className='pf-c-card' variant='large' title='no results womp womp' text='womp womp' />}
        {sigTableError && <MessageState className='pf-c-card' variant='large' title='poop' text='poop' />}
        <Pagination
            itemCount={sigTableData?.rules?.totalCount || 0}
            widgetId="pagination-options-menu-bottom"
            perPage={tableVars.limit}
            page={page}
            variant={PaginationVariant.bottom}
            onSetPage={onSetPage}
            onPerPageSelect={onPerPageSelect}
        />
    </React.Fragment>;
};

SigTable.propTypes = gqlProps;

export default SigTable;
