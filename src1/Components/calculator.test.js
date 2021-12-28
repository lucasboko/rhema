import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Calculator from './calculator';
import Display from './display';
import Keyboard from './keyboard';

describe('Test <Calculator /> renders properly and equations are well executed', () => {
    it('should render Keyboard and Display', () => {

        const component = shallow(<Calculator />);

        expect(component.find(Display).length).toEqual(1);
        expect(component.find(Keyboard).length).toEqual(1);
    });

    it('should follow proper execution order', () => {

        const component = shallow(<Calculator />);

        const evaluateEquationSpy = jest.spyOn(component.instance(), 'evaluateEquation');
        component.instance().forceUpdate()

        // Series to create an equation
        component.instance().digitClick(9);
        component.instance().operationClick('*');
        component.instance().digitClick(2);
        component.instance().digitClick(0);

        expect(component.state('result')).toEqual(180);
        expect(evaluateEquationSpy).toHaveBeenCalledTimes(4);
    });

    it('should reset calculator properly', () => {

        const component = shallow(<Calculator />);

        // Series to create an equation
        component.instance().digitClick(9);
        component.instance().operationClick('*');
        component.instance().digitClick(2);

        component.instance().resetEquation();

        expect(component.state('equation')).toEqual('');
        expect(component.state('previousResult')).toEqual('');
        expect(component.state('result')).toEqual(0);

    });

    test('Equation limit is 40 and should not change once the limit is reached', () => {

        const component = shallow(<Calculator />);
        const equationTest = '102*95-69+78-365-5-8-98/2-36+10+100+20-2';

        component.setState({
            equation: equationTest,
        });

        component.instance().digitClick(9);
        component.instance().operationClick('*');
        component.instance().digitClick(2);

        expect(component.state('equation')).toEqual(equationTest);

    });

});