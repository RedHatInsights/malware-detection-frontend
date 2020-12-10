import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core/dist/js/components/Breadcrumb/index';

import PropTypes from 'prop-types';
import React from 'react';

const BreadcrumbComponent = ({ items }) => {
    const last = items.pop();
    return <Breadcrumb>
        {items.map((value, key) => <BreadcrumbItem key={key} to={value.to}>{value.name}</BreadcrumbItem>)}
        <BreadcrumbItem isActive>{last.name}</BreadcrumbItem>
    </Breadcrumb>;
};

BreadcrumbComponent.propTypes = {
    items: PropTypes.array
};

export default BreadcrumbComponent;
