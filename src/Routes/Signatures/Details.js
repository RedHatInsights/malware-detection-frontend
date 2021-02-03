import './Details.scss';

import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import { Title, TitleSizes } from '@patternfly/react-core/dist/esm/components/Title';

import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import CodeEditor from '../../Components/CodeEditor/CodeEditor';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { GET_SIGNATURE_DETAILS_PAGE } from '../../operations/queries';
import Loading from '../../Components/Loading/Loading';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import React from 'react';
import SigDetailsTable from '../../Components/SigDetailsTable/SigDetailsTable';
import StatusLabel from '../../Components/StatusLabel/StatusLabel';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const Details = () => {
    const intl = useIntl();
    const { id: sigId } = useParams();
    const breadcrumbs = [{ name: intl.formatMessage(messages.malwareDetection), to: '/insights/malware' }, { name: sigId, to: '#' }];
    const { data, loading } = useQuery(GET_SIGNATURE_DETAILS_PAGE, {
        variables: { ruleName: sigId  }
    });
    const sigDetailsData = data?.rulesList[0];
    const detailBlock = (title, detail) => <React.Fragment>
        <p className='ins-l-detailBlockHeader'>{title}</p>
        <p>{detail}</p>
    </React.Fragment>;

    return <React.Fragment>
        <PageHeader>
            <Breadcrumb items={breadcrumbs} />
            <Title headingLevel='h1' size={TitleSizes['3xl']}>{sigId}</Title>
            <Grid hasGutter>
                <GridItem md={7} sm={12}>
                    { sigDetailsData && <CodeEditor code={sigDetailsData.rawRule} language='objective-c'
                        isReadOnly isDownloadEnabled isCopyEnabled />}
                </GridItem>
                {loading ? <Loading /> :
                    <GridItem md={5} sm={12}>
                        <Grid hasGutter>
                            <GridItem span={6}>
                                {detailBlock(intl.formatMessage(messages.lastmatch), sigDetailsData?.lastMatchDate ?
                                    <DateFormat date={new Date(sigDetailsData.lastMatchDate)} type="onlyDate" />
                                    : intl.formatMessage(messages.never))}
                            </GridItem>
                            <GridItem span={6}>
                                {detailBlock(intl.formatMessage(messages.hostmatch),
                                    <span>{`${sigDetailsData?.affectedHosts?.totalCount}/${data?.hosts?.totalCount}`}</span>)}
                            </GridItem>
                            <GridItem span={12}>
                                {detailBlock(intl.formatMessage(messages.description), sigDetailsData?.metadata?.description)}
                            </GridItem>
                            <GridItem span={6}>
                                {detailBlock(intl.formatMessage(messages.status), sigDetailsData && <StatusLabel {...sigDetailsData} />)}
                            </GridItem>
                            <GridItem span={6}>
                                {detailBlock(intl.formatMessage(messages.author), sigDetailsData?.metadata?.author)}
                            </GridItem>
                        </Grid>
                    </GridItem>}
            </Grid>
        </PageHeader>
        <Main>
            <Title headingLevel='h1' size={TitleSizes['3xl']}>
                {intl.formatMessage(messages.affectedHosts)}
            </Title>
            <SigDetailsTable ruleName={sigId} affectedCount={sigDetailsData?.affectedHosts?.totalCount}/>
        </Main>
    </React.Fragment>;
};

export default Details;
