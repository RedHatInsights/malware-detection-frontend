import './NumberData.scss';

import { Tooltip, TooltipPosition } from '@patternfly/react-core/dist/esm/components/Tooltip/Tooltip';

import React from 'react';
import propTypes from 'prop-types';

export const NumberData = ({ data, dataSize, percentageData, iconTooltipText }) => (
    <div className="ins-c-dashboard__number-data--number-percentage">
        <span className={ `ins-c-dashboard__number-data--${dataSize}` }>
            {data}
        </span>
        {percentageData &&
            <span className="ins-c-dashboard__number-percentage">
                <span>{percentageData}</span>
                <Tooltip
                    key={ `${iconTooltipText}` }
                    position={ TooltipPosition.top }
                    content={ <div>{iconTooltipText}</div> }>
                </Tooltip>
            </span>
        }
    </div>
);

NumberData.propTypes = {
    data: propTypes.any,
    dataSize: propTypes.string,
    linkDescription: propTypes.string,
    percentageData: propTypes.string,
    iconTooltipText: propTypes.node
};

export default NumberData;
