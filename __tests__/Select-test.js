import React from 'react';
import Select from '../src/Select';
import Modal from '../src/Modal';
import { shallow, mount } from 'enzyme';
import { wrap } from 'module';

const props = {
    onClick: function() {},
    options: [],
    hasInput: true,
    optionVal: ''
}

describe('<Select/>', () => {

    it('renders without crashing', () => {
        shallow(<Select {...props} />);
    });

    it('should render a selectContainer data-testid attribute', () => {
        const wrapper = shallow(<Select {...props} />);

        expect(wrapper.find('[data-testid="selectContainer"]')).toHaveLength(1);
    });

    it('should render a select data-testid attribute', () => {
        const wrapper = shallow(<Select {...props} />);

        expect(wrapper.find('[data-testid="select"]')).toHaveLength(1);
    });

    it('should render an arrowContainer data-testid attribute', () => {
        const wrapper = shallow(<Select {...props} />);

        expect(wrapper.find('[data-testid="arrowContainer"]')).toHaveLength(1);
    });

    it('should render an arrow data-testid attribute', () => {
        const wrapper = shallow(<Select {...props} />);

        expect(wrapper.find('[data-testid="arrow"]')).toHaveLength(1);
    });

    it('should render a modalOverlay data-testid attribute', () => {
        const wrapper = shallow(<Select {...props} />);
        expect(wrapper.find('[data-testid="modalOverlay"]')).toHaveLength(1);
    });

    it('should dynamically render classname depending on showModal property value', () => {
        const wrapper = shallow(<Select {...props} />);
        wrapper.setState({ showModal: true }, () => {
            expect(wrapper.find('.modal-background-overlay.show')).toHaveLength(1);
        });
    });

    it('should render a Modal component ', () => {
        const wrapper = shallow(<Select {...props} />);
        expect(wrapper.find(Modal)).toHaveLength(1);
    });

});
