import './NumberDescription.scss';

import { Flex, FlexItem } from '@patternfly/react-core/dist/esm/layouts/Flex/index';

import { Button } from '@patternfly/react-core/dist/esm/components/Button/Button';
import { NumberData } from '../NumberData/NumberData';
import React from 'react';
import propTypes from 'prop-types';

export const NumberDescription = ({ data, dataSize, percentageData, link, description, linkDescription, layout, iconTooltipText, flexDirection }) => (
    <div className={ `ins-c-dashboard__number-description ${layout ? `pf-m-${layout}` : ''}` }>
        <Flex direction={ flexDirection }>
            <FlexItem spacer={ { default: 'spacerXs' } }>
                <NumberData data={ data } dataSize={ dataSize } percentageData={ percentageData } iconTooltipText={ iconTooltipText } />
            </FlexItem>
            {description && <FlexItem spacer={ { default: 'spacerXs' } }>
                <span>{description}</span>
            </FlexItem>}
            { linkDescription && <FlexItem spacer={ { default: 'spacerXs' } }>
                <Button component='a' isInline variant="link" href={ link } >{linkDescription}</Button>
            </FlexItem> }
        </Flex>
    </div>
);

NumberDescription.propTypes = {
    data: propTypes.any,
    dataSize: propTypes.string,
    percentageData: propTypes.string,
    link: propTypes.any,
    description: propTypes.string,
    linkDescription: propTypes.string,
    layout: propTypes.string,
    critical: propTypes.string,
    iconTooltipText: propTypes.node,
    flexDirection: propTypes.object
};

export default NumberDescription;
