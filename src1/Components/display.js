import React from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

import '../../public/styles.css';

const Display = (props) => {

    const equationLength = props.equation.length;
    const displaySize = equationLength <= 8 ? "display-big" : "display-small";

    let eq = '';

    if (equationLength > 0) {
        eq = '<ul>';
        const equationArray = props.equation.match(/[^\d()]+|[\d.]+/g);
        equationArray.map((obj, index) => {
            switch (obj) {
                case '*':
                    eq = eq + '<li class="times-symbol"></li>';
                    break;
                case '+':
                    eq = eq + '<li class="plus-symbol"></li>';
                    break;
                case '/':
                    eq = eq + '<li class="division-symbol"></li>';
                    break;
                case '-':
                    eq = eq + '<li class="minus-symbol"></li>';
                    break;
                default:
                    eq = eq + '<li>' + obj + '</li>';
                    break;
            }
        });
        eq = eq + '</ul>';

    }

    return (
        <React.Fragment>
            <div
                id="equation"
                className={displaySize}
                dangerouslySetInnerHTML={{ __html: eq }}>
            </div>
            <div id="result" className={displaySize}>
                {props.result}
            </div>
        </React.Fragment>
    );
};

Display.propTypes = {
    equation: PropTypes.string,
    result: PropTypes.number
}

Display.defaultProps = {
    equation: '',
    result: 0
}

export default Display;