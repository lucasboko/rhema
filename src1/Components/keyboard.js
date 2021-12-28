import React from 'react';
import PropTypes from 'prop-types';

import '../../public/styles.css';

import divisionPng from "../../public/images/division.png";
import plusPng from "../../public/images/plus.png";
import minusPng from "../../public/images/minus.png";
import timesPng from "../../public/images/times.png";
import equalPng from "../../public/images/equal.png";

const Keyboard = (props) => {
    return (
        <div id="keyboard">
            <div>
                <button id="clear-display" onClick={() => props.resetEquation()}>CLEAR</button>
            </div>
            <div className="digit-pad">
                <button className="digit-button" onClick={() => props.digitClick(7)}>7</button>
                <button className="digit-button" onClick={() => props.digitClick(8)}>8</button>
                <button className="digit-button" onClick={() => props.digitClick(9)}>9</button>
                <button className="operand-button" onClick={() => props.operationClick('/')}>
                    <img src={divisionPng} />
                </button>
            </div>
            <div className="digit-pad">
                <button className="digit-button" onClick={() => props.digitClick(4)}>4</button>
                <button className="digit-button" onClick={() => props.digitClick(5)}>5</button>
                <button className="digit-button" onClick={() => props.digitClick(6)}>6</button>
                <button className="operand-button" onClick={() => props.operationClick('*')}>
                    <img src={timesPng} />
                </button>
            </div>
            <div className="digit-pad">
                <button className="digit-button" onClick={() => props.digitClick(1)}>1</button>
                <button className="digit-button" onClick={() => props.digitClick(2)}>2</button>
                <button className="digit-button" onClick={() => props.digitClick(3)}>3</button>
                <button className="operand-button" onClick={() => props.operationClick('-')}>
                    <img src={minusPng} /
                    ></button>
            </div>
            <div className="digit-pad">
                <button className="digit-button digit-0" onClick={() => props.digitClick(0)}>0</button>
                <button className="equal-button"><img src={equalPng} /></button>
                <button className="operand-button" onClick={() => props.operationClick('+')}>
                    <img src={plusPng} />
                </button>
            </div>
        </div>
    );
}


Keyboard.propTypes = {
    digitClick: PropTypes.func.isRequired,
    operationClick: PropTypes.func.isRequired,
    resetEquation: PropTypes.func.isRequired
}

export default Keyboard;