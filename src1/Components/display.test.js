import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Display from './display';

describe('Test <Display /> renders equation and result properly', () => {

    it('should render the expected html', () => {

        const equationTest = '8*5/2'
        const resultTest = 20;
        const expectedHtmlOutput = [
            '<div id="equation" class="display-big">',
                '<ul>',
                    '<li>8</li>',
                    '<li class="times-symbol"></li>',
                    '<li>5</li>',
                    '<li class="division-symbol"></li>',
                    '<li>2</li>',
                '</ul>',
            '</div>',
            '<div id="result" class="display-big">20</div>',
        ].join('');

        const component = shallow(<Display equation={equationTest} result={resultTest} />);

        expect(component.html()).toEqual(expectedHtmlOutput);
    });

});