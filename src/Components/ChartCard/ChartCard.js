import { Card, CardBody } from '@patternfly/react-core/dist/esm/components/Card';

import Loading from '../../Components/Loading/Loading';
import NumberDescription from '../NumberDescription/NumberDescription';
import React from 'react';
import { gqlProps } from '../Common';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const ChartCard = ({ data: sysStatsData, loading: sysStatsLoading }) => {
    const intl = useIntl();

    return <Card>
        <CardBody>
            {sysStatsLoading ? <Loading /> :
                <NumberDescription
                    data={sysStatsData?.hostScans?.totalCount}
                    dataSize='md'
                    description={intl.formatMessage(messages.analysisRunAcross,
                        { systems: sysStatsData?.hosts?.totalCount, matches: sysStatsData?.ruleStats?.matchedCount })}
                    layout='horizontal'
                />
            }
        </CardBody>
    </Card>;
};

ChartCard.propTypes = gqlProps;

export default ChartCard;
