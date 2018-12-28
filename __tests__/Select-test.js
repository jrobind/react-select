import React from 'react';
import Select from '../src/Select';
import { shallow } from 'enzyme';

const props = {
    onClick: function() {},
    options: [],
    hasInput: true,
    optionVal: ''
}

it('renders without crashing', () => {
    shallow(<Select {...props} />);
});