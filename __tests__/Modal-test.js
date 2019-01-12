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

    it('should render a modalContainer data-testid attribute', () => {
        const wrapper = shallow(<Modal {...props} />);

        expect(wrapper.find('[data-testid="modalContainer"]')).toHaveLength(1);
    });

    it('should render a modalTitle data-testid attribute', () => {
        const wrapper = shallow(<Modal {...props} />);

        expect(wrapper.find('[data-testid="modalTitle"]')).toHaveLength(1);
    });

    
    it('should render a modalForm data-testid attribute', () => {
        const wrapper = shallow(<Modal {...props} />);

        expect(wrapper.find('[data-testid="modalForm"]')).toHaveLength(1);
    });

});