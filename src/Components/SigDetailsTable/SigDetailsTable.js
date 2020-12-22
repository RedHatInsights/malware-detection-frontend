import { Pagination, PaginationVariant } from '@patternfly/react-core/dist/esm/components/Pagination';
import React, { useEffect, useReducer } from 'react';
import {
    SortByDirection,
    Table,
    TableBody,
    TableHeader,
    cellWidth,
    sortable
} from '@patternfly/react-table/dist/esm/components/Table';

import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import { DateFormat } from '@redhat-cloud-services/frontend-components/components/DateFormat';
import { GET_SIGNATURE_DETAILS_TABLE } from '../../operations/queries';
import Loading from '../Loading/Loading';
import MessageState from '../MessageState/MessageState';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/components/PrimaryToolbar';
import messages from '../../Messages';
import propTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';

const sortIndices = { 0: 'HOSTNAME', 1: 'LAST_SCAN_DATE' };
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

const SigDetailsTable = ({ ruleName, affectedCount }) => {
    const intl = useIntl();
    const initialState = {
        tableVars: {
            limit: 10,
            offset: 0,
            orderBy: 'LAST_SCAN_DATE_ASC',
            hostName: '',
            ruleName
        },
        sortBy: {
            index: 1,
            direction: SortByDirection.asc
        },
        rows: []
    };
    const [{ tableVars, sortBy, rows }, stateSet] = useReducer(tableReducer, {
        ...initialState
    });
    const { data, loading, error } =
        useQuery(GET_SIGNATURE_DETAILS_TABLE, { variables: tableVars });
    const columns = [
        { title: intl.formatMessage(messages.name), transforms: [cellWidth(45)] },
        { title: intl.formatMessage(messages.status), transforms: [sortable] }
    ];

    const page = tableVars.offset / tableVars.limit + 1;

    const filterConfigItems = [{
        label: intl.formatMessage(messages.name).toLowerCase(),
        filterValues: {
            key: 'text-filter',
            onChange: (e, value) => stateSet({ type: 'setTableVars', payload: { hostName: value } }),
            value: tableVars.hostName,
            placeholder: intl.formatMessage(messages.filterBy, { field: intl.formatMessage(messages.name).toLowerCase() })
        }
    }];

    const onSetPage = (e, page) => stateSet({ type: 'setTableVars', payload: { offset: page * tableVars.limit - tableVars.limit } });

    const onPerPageSelect = (e, perPage) => stateSet({ type: 'setTableVars', payload: { limit: perPage, offset: 0 } });

    const onSort = (e, index, direction) =>
        stateSet({ type: 'setSortBy', payload: { index, direction }, tableVars: { orderBy: orderBy({ index, direction }), offset: 0 } });

    useEffect(() => {
        const rowBuilder = data => data?.flatMap((data, key) => {
            const host = data;
            return [{
                rowId: key,
                isOpen: false,
                cells: [
                    { title: <span>{host.hostname}</span> },
                    { title: <DateFormat date={new Date(host.lastScanDate)} type="onlyDate" /> }
                ]
            }];
        });
        stateSet({ type: 'setRows', payload: rowBuilder(data?.rulesList[0]?.affectedHostsList) });
    }, [intl, data]);

    return <React.Fragment>
        <PrimaryToolbar
            pagination={{
                itemCount: data?.rulesList[0]?.affectedHosts?.totalCount || 0,
                page,
                perPage: tableVars.limit,
                onSetPage(e, page) { onSetPage(e, page); },
                onPerPageSelect(e, perPage) { onPerPageSelect(e, perPage); },
                isCompact: true
            }}
            filterConfig={{ items: filterConfigItems }}
        />
        <Table className='sigTable' aria-label="Signature Details table"
            rows={rows} cells={columns}
            onSort={onSort} sortBy={sortBy}>
            <TableHeader />
            <TableBody />
        </Table>
        {loading && <Loading type='table' />}
        {!error ? !loading && data?.rulesList[0]?.affectedHosts?.totalCount === 0 && affectedCount > 0 ?
            <MessageState className='pf-c-card' variant='large' title='no results womp womp' text='womp womp' />
            : <MessageState className='pf-c-card' variant='large' icon={CheckCircleIcon} iconClass='ins-l-success-color'
                title={intl.formatMessage(messages.noMatches)}
                text={intl.formatMessage(messages.systemsNotAffected)} />
            : <MessageState className='pf-c-card' variant='large' title='poop' text='poop' />}
        <Pagination
            itemCount={data?.rulesList[0]?.affectedHosts?.totalCount || 0}
            widgetId="pagination-options-menu-bottom"
            perPage={tableVars.limit}
            page={page}
            variant={PaginationVariant.bottom}
            onSetPage={onSetPage}
            onPerPageSelect={onPerPageSelect}
        />
    </React.Fragment>;
};

SigDetailsTable.propTypes = { ruleName: propTypes.string, affectedCount: propTypes.number };

export default SigDetailsTable;
