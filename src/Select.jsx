import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

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
            <div 
                className='select-container'
                data-testid='selectContainer'    
            >
                <div 
                    className='select'
                    data-testid='select' 
                    onClick={this.handleModalDisplay}
                >
                    {optionVal}
                    <div 
                        className='select-arrow-container'
                        data-testid='arrowContainer'
                    >
                        <span 
                            className='select-arrow'
                            data-testid='arrow'
                        >
                            &#9662;
                        </span>
                    </div>
                </div>
                <div 
                    className={showModal ? 'modal-background-overlay show' : 'modal-background-overlay'}
                    data-testid='modalOverlay'
                >
                    <Modal 
                        {...this.props}
                        showModal={showModal}
                        handleSelectTitle={this.handleSelectTitle}
                    />
                </div>    
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