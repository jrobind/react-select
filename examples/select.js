import React, { Component } from 'react';
import Select from '../src/Select.jsx';

class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectedOption) {
        this.setState(() => ({selectedOption}));
        console.log(selectedOption);
    }

    render() {
        return (
            <Select 
                optionVal='Select an option'
                hasInput={true}
                options={['option1', 'option2', 'option3']}
                onChange={this.handleChange}
            />
        )
    }
}

export default Example;