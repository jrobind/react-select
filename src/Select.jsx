import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options || [],
            optionVal: this.props.optionVal || '',
            selectedOption: false
        }

        this.handleModalDisplay = this.handleModalDisplay.bind(this);
        this.handleSelectTitle = this.handleSelectTitle.bind(this);
    }

    handleModalDisplay() {
        this.setState((prevState) => ({selectedOption: !prevState.selectedOption}));
    }

    handleSelectTitle(newVal) {
        this.setState(() => ({optionVal: newVal}));
        console.log(this.state)
    }

    render() {
        const { selectedOption, optionVal } = this.state;

        return (
            <div className='select-container'>
                <div 
                    className='option-container' 
                    onClick={this.handleModalDisplay}
                >
                    {optionVal}
                    <span>&#9662;</span>
                </div>
                {selectedOption ? <Modal 
                                    {...this.props}
                                    handleSelectTitle={this.handleSelectTitle}
                                /> : null}
            </div>
        )
    }
}

Select.propTypes = {
    options: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    hasInput: PropTypes.bool.isRequired
}

export default Select;