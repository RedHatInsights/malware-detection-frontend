import { LockIcon } from '@patternfly/react-icons/dist/esm/icons/lock-icon';
import MessageState from '../MessageState/MessageState';
import { CodeEditor as PfCodeEditor } from '@patternfly/react-code-editor';
import PropTypes from 'prop-types';
import React from 'react';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const CodeEditor = ({ code, language = 'text', isReadOnly, isDownloadEnabled, isCopyEnabled }) => {
    const intl = useIntl();

    return <PfCodeEditor
        isDownloadEnabled={isDownloadEnabled}
        isCopyEnabled={isCopyEnabled}
        isLineNumbersVisible
        isReadOnly={isReadOnly}
        isLanguageLabelVisible
        code={code}
        language={language}
        emptyState={
            <MessageState className='' icon={LockIcon} variant='small' title={intl.formatMessage(messages.sigCompiled)}
                text={intl.formatMessage(messages.sigCompiledBody)} />
        }
        height='400px'
    />;
};

CodeEditor.propTypes = {
    code: PropTypes.any,
    language: PropTypes.string,
    isReadOnly: PropTypes.bool,
    isCopyEnabled: PropTypes.bool,
    isDownloadEnabled: PropTypes.bool
};

CodeEditor.defaultProps = { codeType: 'Code' };

export default CodeEditor;
