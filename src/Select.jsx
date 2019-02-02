import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: this.props.options || [],
            optionVal: this.props.optionVal || '',
            showModal: false,
            optionsHighlighted: []
        }

        this.handleModalDisplay = this.handleModalDisplay.bind(this);
        this.handleSelectTitle = this.handleSelectTitle.bind(this);
        this.handleOptionHighlighting = this.handleOptionHighlighting.bind(this);
        this.createId = this.createId.bind(this);
    }

    handleModalDisplay() {
        this.setState((prevState) => ({showModal: !prevState.showModal}));
    }

    handleSelectTitle({ val }) {
        this.setState(() => ({optionVal: val}));
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
            return {val: option, id: uid, selected: false}
        });
    }

    handleOptionHighlighting({eventType, filterVal, optionsWithId}) {
        // reset options that may have already been highlighted
        optionsWithId = optionsWithId.map(option => {
            if (option.selected) { option.selected = false; }
            return option;
        })
        // check event type
        if (eventType === 'submit') {
            const optionsHighlighted = optionsWithId.map(option => {
                if (option.val === filterVal) { option.selected = true; }
                return option;
            });
            console.log(optionsHighlighted)
            this.setState(() => ({optionsHighlighted}));
        } else {
            // click case
        }


        // this.setState(() => ({ selectedUid: uid }));
        // // remove any select attributes
        // Array.from(e.target.parentElement.children)
        //     .forEach((option) => option.hasAttribute('selected') && option.removeAttribute('selected'));
        // // set attribute so we can highlight selected option
        // e.target.setAttribute('selected', '');
    }

    render() {
        const { 
            showModal, 
            optionVal, 
            options, 
            optionsHighlighted 
        } = this.state;

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
                        {...this.state}
                        {...this.props}
                        optionsWithId={ optionsHighlighted.length ? optionsHighlighted : this.createId(options)}
                        handleOptionHighlighting={this.handleOptionHighlighting}
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