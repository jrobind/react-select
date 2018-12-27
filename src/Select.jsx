import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './modal';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options || [],
            optionVal: this.props.optionVal || '',
            showModal: false
        }

        this.handleModalDisplay = this.handleModalDisplay.bind(this);
        this.handleSelectTitle = this.handleSelectTitle.bind(this);
    }

    handleModalDisplay() {
        this.setState((prevState) => ({showModal: !prevState.showModal}));
    }

    handleSelectTitle(newVal) {
        this.setState(() => ({optionVal: newVal}));
        // if a selection is made then we need to remove modal
        this.handleModalDisplay();
    }

    render() {
        const { showModal, optionVal } = this.state;

        return (
            <div className='select-container'>
                <div 
                    className='select' 
                    onClick={this.handleModalDisplay}
                >
                    {optionVal}
                    <div className='select-arrow-container'>
                        <span className='select-arrow'>&#9662;</span>
                    </div>
                </div>
                {showModal ? <Modal 
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