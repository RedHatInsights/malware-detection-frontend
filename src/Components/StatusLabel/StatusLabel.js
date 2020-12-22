import { Label } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import React from 'react';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const StatusLabel = ({ isDisabled, hasMatch }) => {
    const intl = useIntl();
    return <React.Fragment>
        {isDisabled && !hasMatch && <Label>{intl.formatMessage(messages.disabled)}</Label>}
        {!isDisabled && !hasMatch && <Label color="blue">{intl.formatMessage(messages.enabled)}</Label>}
        {hasMatch && <Label color="red">{intl.formatMessage(messages.matched)}</Label>}
    </React.Fragment>;
};

StatusLabel.propTypes = {
    isDisabled: PropTypes.bool,
    hasMatch: PropTypes.bool
};
export default StatusLabel;
