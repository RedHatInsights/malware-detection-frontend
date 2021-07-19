import './App.scss';

import { NotificationsPortal, notifications } from '@redhat-cloud-services/frontend-components-notifications/';

import { Banner } from '@patternfly/react-core/dist/esm/components/Banner/index';
import { GET_MALWARE_COUNT } from './operations/queries';
import React from 'react';
import { Routes } from './Routes';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import { hasMalware } from './store/cache';
import messages from './Messages';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';

const registry = getRegistry();
registry.register({ notifications });
const App = (props) => {
    const { data, loading } = useQuery(GET_MALWARE_COUNT);
    const intl = useIntl();
    !loading && hasMalware(Number(data?.ruleStats?.matchedCount) !== 0);
    return <React.Fragment>
        <NotificationsPortal />
        { !loading && hasMalware() && <Banner variant="danger" className='ins-l-malwareBanner'>{intl.formatMessage(messages.weDetected)}</Banner>}
        <Routes childProps={props} />
    </React.Fragment>;
};

export default withRouter(App);
