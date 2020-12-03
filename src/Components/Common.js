import { Button } from '@patternfly/react-core/dist/esm/components/Button';
import React from 'react';

const link = (desc, url = '#') => <Button isInline component='a' variant='link' href={url}>{desc}</Button>;

export { link };
