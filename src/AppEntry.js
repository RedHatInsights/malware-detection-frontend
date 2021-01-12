/* eslint-disable no-console */
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { client } from './store/client';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/files/helpers';
import { init } from './store';
import logger from 'redux-logger';
import messages from '../locales/data.json';

const AppEntry = ({ useLogger, connectToDevTools }) =>
    <IntlProvider locale={navigator.language.slice(0, 2)} messages={messages} onError={console.log}>
        <ApolloProvider client={client({ connectToDevTools })}>
            <Provider store={(useLogger ? init(logger) : init()).getStore()}>
                <Router basename={getBaseName(window.location.pathname)}>
                    <App />
                </Router>
            </Provider>
        </ApolloProvider>
    </IntlProvider>;

AppEntry.propTypes = {
    useLogger: PropTypes.bool,
    connectToDevTools: PropTypes.bool

};

AppEntry.defaultProps = {
    useLogger: false,
    connectToDevTools: false
};

export default AppEntry;
