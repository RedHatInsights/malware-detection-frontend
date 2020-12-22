import {
    EmptyState,
    EmptyStateIcon,
    Skeleton,
    Title
} from '@patternfly/react-core/dist/esm/components';

import React from 'react';
import propTypes from 'prop-types';

const Loading = ({ type }) => {
    const Spinner = () => (
        <span className="pf-c-spinner" role="progressbar" aria-valuetext="Loading...">
            <span className="pf-c-spinner__clipper" />
            <span className="pf-c-spinner__lead-ball" />
            <span className="pf-c-spinner__tail-ball" />
        </span>
    );

    switch (type) {
        case 'table': return <div className='ins-l-common--BackgroundColor'>
            <br />
            <Skeleton width="75%" screenreaderText="Loading contents" />
            {[...Array(9)].map((value, key) => <React.Fragment key={key}><br /><Skeleton width="75%" /><br /></React.Fragment>)}
        </div>;

        default: return <EmptyState>
            <EmptyStateIcon variant="container" component={Spinner} />
            <Title size="lg" headingLevel="h4">
                Loading
            </Title>
        </EmptyState>;
    }

};

Loading.propTypes = { type: propTypes.string };

export default Loading;
