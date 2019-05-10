import React from 'react';
import Modal from '../src/Modal';
import { shallow, mount } from 'enzyme';

const props = {
    onClick() {},
    handleSelectTitle() {},
    handleOptionHighlighting() {},
    options: ['option1', 'option2', 'option3'],
    hasInput: true,
    showModal: true,
    optionVal: '',
    optionsWithId: [
        { id: '956216853625', selected: false, val: 'option1' },
        { id: '956216853626', selected: false, val: 'option2' },
        { id: '956216853627', selected: false, val: 'option3' }
    ]
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

    it('should render correct number of options', () => {
        const wrapper = shallow(<Modal {...props} />);

        expect(wrapper.find('[data-testid="modalOptions"] li')).toHaveLength(3);
    });

    it('should render correct options with user input search', () => {
        const wrapper = shallow(<Modal {...props} />);
        const input = wrapper.find('input');
        const optionObj = {"id": "956216853625", "selected": false, "val": "option1"};
        
        input.simulate('change', { target: { value: 'option1' }});

        expect(wrapper.find('[data-testid="modalOptions"] li')).toHaveLength(1)
        expect(wrapper.find('[data-testid="modalOptions"] li').text()).toEqual('option1');
        expect(wrapper.state('filteredOptions')[0]).toEqual(optionObj);
    });

});