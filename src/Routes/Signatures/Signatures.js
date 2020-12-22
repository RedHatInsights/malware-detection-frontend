import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import { Main, PageHeader } from '@redhat-cloud-services/frontend-components';
import React, { Suspense, lazy } from 'react';
import { Title, TitleSizes } from '@patternfly/react-core/dist/esm/components/Title';

import { GET_SIGNATURE_PAGE } from '../../operations/queries';
import Loading from '../../Components/Loading/Loading';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';

const SigTable = lazy(() => import(/* webpackChunkName: 'SigTable' */ '../../Components/SigTable/SigTable'));
const StatusCard = lazy(() => import(/* webpackChunkName: 'StatusCard' */ '../../Components/StatusCard/StatusCard'));
const ChartCard = lazy(() => import(/* webpackChunkName: 'ChartCard' */ '../../Components/ChartCard/ChartCard'));

const Signatures = () => {
    const intl = useIntl();
    const sigPageData = useQuery(GET_SIGNATURE_PAGE);

    return <React.Fragment>
        <PageHeader>
            <Title headingLevel='h1' size={TitleSizes['3xl']}>
                {intl.formatMessage(messages.malwareDetection)}
            </Title>
        </PageHeader>
        <Main>
            <Grid hasGutter>
                <GridItem md={6} sm={12}>
                    <Suspense fallback={<Loading />}><StatusCard {...sigPageData} /></Suspense>
                </GridItem>
                <GridItem md={6} sm={12}>
                    <Suspense fallback={<Loading />}><ChartCard {...sigPageData} /></Suspense>
                </GridItem>
                <GridItem span={12}>
                    <Suspense fallback={<Loading />}><SigTable /></Suspense>
                </GridItem>
            </Grid>
        </Main>
    </React.Fragment>;
};

export default withRouter(Signatures);
