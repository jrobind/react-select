import React from 'react';
import Modal from '../src/Modal';
import { shallow, mount } from 'enzyme';

const props = {
    onClick: function() {},
    handleSelectTitle: function() {},
    options: [],
    hasInput: true,
    optionVal: ''
}

describe('<Modal/>', () => {

    it('renders without crashing', () => {
        shallow(<Modal {...props} />);
    });

});