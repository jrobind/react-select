import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filtering: false,
            filteredOptions: null
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleOptionSearch = this.handleOptionSearch.bind(this);
    }

    handleSelectChange(e) {
        const val = e.target.value;
        this.props.onChange(val);
    }

    handleOptionSearch(e) {
        const { options } = this.props;
        const optionsFormattted = options.map(option => option.toLowerCase());
        const val = e.target.value.toLowerCase();

        // set filtering state
        this.setState(() => ({filtering: true}));
        // auto select matching options based on presence of letters
        const test = 
        this.setState(() => ({filteredOptions: optionsFormattted.filter(option => option.includes(val))}));
    }

    render() {
        const { options, optionVal, hasInput } = this.props;
        const { filtering, filteredOptions } = this.state;
        const optionsToRender = filtering ? filteredOptions : options;
        console.log(filteredOptions, filtering)
        return(
            <div className='modal-background'>
                <div className='modal-container'>
                    <div className='modal-title'>
                        {optionVal}
                    </div>
                    {hasInput ? <div className='modal-input-container'>
                        <input onChange={this.handleOptionSearch} type='text'></input>
                    </div> : null}
                    <ul>
                        <div onChange={this.handleSelectChange}>
                            {optionsToRender.map((option, i) => (
                                <li
                                    key={i} 
                                    value={option}
                                >
                                    {option}
                                </li>
                            ))}
                        </div>
                    </ul>              
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    onChange: PropTypes.func.isRequired,
    optionVal: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    hasInput: PropTypes.bool.isRequired
}


export default Modal;