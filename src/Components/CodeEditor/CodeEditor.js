import '../../../node_modules/@patternfly/patternfly/components/CodeEditor/code-editor.scss';

import PropTypes from 'prop-types';
import React from 'react';

const CodeEditor = ({ code, codeType }) =>
    <div className="pf-c-code-editor pf-m-read-only ins-l-code-editor">
        <div className="pf-c-code-editor__header">
            <div className="pf-c-code-editor__tab">
                <span className="pf-c-code-editor__tab-icon">
                    <i className="fas fa-code"></i>
                </span>
                <span className="pf-c-code-editor__tab-text">{codeType}</span>
            </div>
        </div>
        <div className="pf-c-code-editor__main">
            <div className="pf-c-code-editor__code">
                <pre className="pf-c-code-editor__code-pre">
                    {code}
                </pre>
            </div>
        </div>
    </div>;

CodeEditor.propTypes = {
    code: PropTypes.any,
    codeType: PropTypes.string
};

CodeEditor.defaultProps = { codeType: 'Code' };

export default CodeEditor;
