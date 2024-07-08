import React from 'react';

global.React = React;
jest.mock('@redhat-cloud-services/frontend-components/useChrome', () => ({
  __esModule: true,
  default: () => ({
    getApp: () => 'malware',
    getBundle: () => 'insights',
  }),
}));
