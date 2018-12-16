import React, { Component } from 'react';
import Select from '../src/Select.jsx';

class Example extends Component {
   render() {
        return (
            <Select 
                optionVal = 'Select an option'
                options={['option1', 'option2', 'option3']}
            />
        )
    }
}

export default Example;