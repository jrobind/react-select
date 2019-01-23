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
        this.createId = this.createId.bind(this);
    }

    handleModalDisplay() {
        this.setState((prevState) => ({showModal: !prevState.showModal}));
    }

    handleSelectTitle(newVal) {
        this.setState(() => ({optionVal: newVal}));
        // if a selection is made then we need to remove modal
        this.handleModalDisplay();
    }

    createId(options) {
        // create objects from option strings
        return options.map(option => {
            let uid = '';
            for(let i = 0; i < 12; i++) {
                uid += Math.floor(Math.random() * 10);
            }
            return {val: option, id: uid}
        });
    }

    render() {
        const { showModal, optionVal, options } = this.state;

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
                        optionsWithId={this.createId(options)}
                        showModal={showModal}
                        optionVal={optionVal}
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