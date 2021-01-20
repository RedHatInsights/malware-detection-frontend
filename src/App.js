import './App.scss';

import { NotificationsPortal, notifications } from '@redhat-cloud-services/frontend-components-notifications/';
import React, { useEffect } from 'react';

import { Banner } from '@patternfly/react-core/dist/esm/components/Banner/index';
import { GET_MALWARE_COUNT } from './operations/queries';
import { Provider } from 'react-redux';
import { Routes } from './Routes';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/files/Registry';
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

    useEffect(() => {
        insights.chrome.init();
        // nothing to identify, YET
        //insights.chrome.identifyApp('malware');
        insights.chrome.hideGlobalFilter?.();
    }, []);

    !loading && hasMalware(Number(data.ruleStats.matchedCount) !== 0);

    return <Provider store={registry.getStore()}>
        <NotificationsPortal />
        { !loading && hasMalware() && <Banner variant="danger" className='ins-l-malwareBanner'>{intl.formatMessage(messages.weDetected)}</Banner>}
        <Routes childProps={props} />
    </Provider>;
};

export default withRouter(App);
