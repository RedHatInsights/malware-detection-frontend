import { Button } from '@patternfly/react-core/dist/esm/components/Button';
import React from 'react';
import propTypes from 'prop-types';

const link = (desc, url = '#') => <Button isInline component='a' variant='link' href={url}>{desc}</Button>;

export { link };

export const gqlProps = {
    data: propTypes.object,
    loading: propTypes.bool,
    error: propTypes.object
};
