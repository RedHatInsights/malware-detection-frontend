import './StatusCard.scss';

import { Card, CardBody } from '@patternfly/react-core/dist/esm/components/Card/index';
import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';

import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import Loading from '../../Components/Loading/Loading';
import MessageState from '../MessageState/MessageState';
import React from 'react';
import { gqlProps } from '../Common';
import { hasMalware } from '../../store/cache';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const StatusCard = ({ data: sigStatsData, loading: sigStatsLoading }) => {
    const intl = useIntl();
    const dateFormatter = (date) => {
        const newDate = (new Date(date)).toString().split(' ');
        return `${newDate[2]} ${newDate[1]} ${newDate[3]}`;
    };

    return <Card className='ins-l-card'>
        <CardBody>
            <Grid>
                {sigStatsLoading ? <Loading /> : <GridItem span={7}><MessageState className='' variant='large'
                    icon={hasMalware() ? ExclamationCircleIcon : CheckCircleIcon}
                    iconClass={hasMalware() ? 'ins-l-danger-color' : 'ins-l-success-color'}
                    title={hasMalware() ?
                        intl.formatMessage(messages.activeFound) : intl.formatMessage(messages.noFound)}
                    text={hasMalware() ?
                        intl.formatMessage(messages.systemsVulnerable) : intl.formatMessage(messages.systemsProtected)} >
                    {`${intl.formatMessage(messages.lastCheck)}
                        ${dateFormatter(sigStatsData?.hostScans?.nodes[0]?.createdAt)}`}
                </MessageState></GridItem>
                }
                <GridItem span={1}
                    className='pf-c-divider pf-m-vertical pf-m-inset-md pf-m-inset-none-on-md pf-m-inset-sm-on-lg pf-m-inset-xs-on-xl' />
                {sigStatsLoading ? <Loading />
                    : <GridItem className='ins-l-sigStatCard' span={3}>
                        <GridItem className='ins-l-sigStat' span={12}>{sigStatsData?.ruleStats?.matchedCount || 0}
                            <p>{intl.formatMessage(messages.signaturesMatch)}</p></GridItem>
                        <GridItem className='ins-l-sigStat' span={12}>{sigStatsData?.ruleStats?.enabledCount || 0}
                            <p>{intl.formatMessage(messages.enabledSignatures)}</p></GridItem>
                        <GridItem className='ins-l-sigStat' span={12}>{sigStatsData?.ruleStats?.disabledDcount || 0}
                            <p>{intl.formatMessage(messages.enabledSignatures)}</p></GridItem>
                    </GridItem>
                }
            </Grid>
        </CardBody>
    </Card>;
};

StatusCard.propTypes = gqlProps;

export default StatusCard;
