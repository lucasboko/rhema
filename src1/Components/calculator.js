import React from 'react';
import Mexp from 'math-expression-evaluator';
import * as _ from 'lodash';

import Dispaly from './display';
import Keyboard from './keyboard';

const equationLimit = 40;

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equation: '',
            previousResult: '',
            result: 0
        };

    }

    // digitClick handle digit 0...9 button clicks
    digitClick = (value) => {
        const equationSize = this.state.equation.length;
        const lastEntry = this.state.equation[equationSize - 1];

        // condition 1: the previous was an +, - or / we don't do accept 0 as the following entry, in case of + or - it does not add anything and in case of division if causes error
        // condition 2: the equation has not reached maximum lenght of 40
        const bool = (_.indexOf(['+', '-', '/'], lastEntry) === -1 && value === 0)
            || (this.state.equation.length < equationLimit);

        if (bool) {
            this.evaluateEquation(value);
        }

    }

    operationClick = (operator) => {
        const equationSize = this.state.equation.length;
        const lastEntry = this.state.equation[equationSize - 1];

        // condition 1: last entry was not an operator
        // condition 2: operator is not the equation
        // condition 3: the equation has not reached maximum lenght of 40
        const bool = _.indexOf(['*', '+', '-', '/'], lastEntry) === -1
            && equationSize > 0
            && equationSize < equationLimit;

        if (bool) {
            this.evaluateEquation(operator, 'operator');
        }
    }

    // if the result is a float with a very more than 4 digits on decimal part then round it to 4
    isFloat = (value) => {

        if (value % 1 !== 0) {

            const valueString = value.toString();
            const pointIndex = valueString.indexOf('.');
            const floatSize = pointIndex > 0 ? valueString.substring(pointIndex + 1, valueString.length).length : 1;

            if (floatSize > 4) {
                value = value.toFixed(4);
            }
        }

        return value;

    }

    // reset calculator to initial state
    resetEquation = () => {
        this.setState({
            equation: '',
            previousResult: '',
            result: 0
        });
    }

    evaluateEquation = (value, type) => {

        const equation = this.state.equation + `${value}`;
        const equationArray = equation.match(/[^\d()]+|[\d.]+/g);
        if (equationArray.length > 3) {

            // if equation has more than 3 items and last entry is a digit we must re-evaluate the equation base on the result before the last operator.
            // example: if the previous equation was 4 + 6 x 2 = 16 then we add 0 and it becomes 4 + 6 x 20 = 10 x 20 = 200.
            
            if (type !== 'operator') {

                const temp = equationArray.slice(equationArray.length - 2, equationArray.length);
                const newOperation = this.state.previousResult + temp.join('');
                const result = Mexp.eval(newOperation);

                const roundResult = this.isFloat(result);

                // if result === 0 then reset the calculator, it is a behavior observed in Windows calculator
                if (result === 0) {
                    this.resetEquation();
                } else {
                    this.setState({
                        equation,
                        result: roundResult,
                    });
                }

            } else {

                // if equation has more than 3 items and last entry is an operator we just add it and we backup the previous result
                this.setState({
                    equation,
                    previousResult: this.state.result.toString(),
                });
            }
        } else if (equationArray.length === 3) {

            // if equation has just 3 items (operand and operators) then we just evaluate
            // example: 8 x 2 = 10

            const result = Mexp.eval(equation);
            const roundResult = this.isFloat(result);

            // if result === 0 then reset the calculator, it is a behavior observed in Windows calculator
            if (result === 0) {
                this.resetEquation();
            } else {
                this.setState({
                    equation,
                    previousResult: equationArray[0],
                    result: roundResult,
                });
            }
        } else {
            // if equation has less than 3 items (operand and operators) then no evaluation is needed
            /// example: 8 x 

            this.setState({
                equation,
            });
        }


    }

    render() {

        return (
            <div id="calculatorWrapper">
                <Dispaly
                    equation={this.state.equation}
                    result={this.state.result}
                />
                <Keyboard
                    resetEquation={this.resetEquation}
                    operationClick={this.operationClick}
                    digitClick={this.digitClick}
                />
            </div>
        );
    }
}


export default Calculator;