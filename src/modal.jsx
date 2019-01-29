import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ handleExit }) => (
    <div className='modal-error-message'>
        <div 
            className='modal-error-message-exit'
            onClick={handleExit}
        >x</div>
        <p>Please select <strong>one</strong> option.</p>
    </div>
)

class Modal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filtering: false,
            filteredOptions: null,
            filterVal: '',
            alertMessage: false,
            selectedUid: null
        }

        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.handleOptionSearch = this.handleOptionSearch.bind(this);
        this.handleOptionHighlighting = this.handleOptionHighlighting.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleExit = this.handleExit.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentWillReceiveProps() {
        const { showModal } = this.props;
        // reset input and options if modal is shown
        showModal && this.reset();
    }

    reset() {
        this.setState(() => ({ 
            filterVal: '', 
            filteredOptions: null,
            filtering: false,
            alertMessage: false
         }));
    }

    handleExit() {
        this.setState(() => ({alertMessage: false}));
    }

    handleSelectClick(e) {
        const val = e ? e.target.innerText : submissionVal;

        this.handleOptionHighlighting(e);
        this.props.onClick(val);
        // the method expects an object
        this.props.handleSelectTitle({val});  
    }

    handleOptionHighlighting(e) {
        const { filterVal } = this.state;
        const { optionsWithId } = this.props;

        // check event type
        if (e.type === 'submit') {
            const filteredOptions = optionsWithId.map(option => {
                if (option.val === filterVal) {
                   option.selected = true;
                }
                return option;
            });
            console.log(filteredOptions)
            this.setState(() => ({filteredOptions}));
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

    handleOptionSearch(e) {
        const { optionsWithId } = this.props;
        const val = e.target.value.toLowerCase();
        const filteredOptions = optionsWithId.filter(option => option.val.toLowerCase().includes(val));

        // set filtering state, filtered options and filter val
        this.setState(() =>({filtering: true, filterVal: val, filteredOptions}));
    }

    handleSubmit(e) {
        const { filteredOptions } = this.state;
        e.preventDefault();
        // only allow submission via enter key if one option value is filtered
        if (filteredOptions && filteredOptions.length === 1) {
            this.setState(() => ({alertMessage: false}));
            this.handleOptionHighlighting(e);
            this.props.handleSelectTitle(filteredOptions[0]);  
        } else {
            // inform user if not
            this.setState(() => ({alertMessage: true}));
        }
    }

    render() {
        const { optionsWithId, optionVal, hasInput } = this.props;
        const { 
            filtering, 
            filteredOptions, 
            alertMessage, 
            selectedUid
        } = this.state;
        const optionsToRender = filtering ? filteredOptions : optionsWithId;
        console.log(optionsToRender)
        return(
            <div 
                className='modal-container'
                data-testid='modalContainer' 
            >
                <div 
                    className='modal-title'
                    data-testid='modalTitle' 
                >
                    {optionVal}
                </div>
                {hasInput ? 
                    <form 
                        onSubmit={this.handleSubmit}
                        className='modal-input-container'
                        data-testid='modalForm' 
                    >
                        {alertMessage ? <ErrorMessage handleExit={this.handleExit}/> : null}
                        <input 
                            className={alertMessage ? 'modal-input-error' : 'modal-input'}
                            value={this.state.filterVal}
                            onChange={this.handleOptionSearch}
                            type='text'></input>
                    </form> : null}
    
                <ul className="modal-options">
                    <div onClick={this.handleSelectClick}>
                        {optionsToRender.map((option, i) => (
                            <li
                                key={i} 
                                value={option.val}
                                uid={option.id}
                                selected={option.selected}
                            >
                                {option.val}
                            </li>
                        ))}
                    </div>
                </ul>              
            </div>
        )
    }
}

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    optionVal: PropTypes.string.isRequired,
    optionsWithId: PropTypes.array.isRequired,
    options: PropTypes.array.isRequired,
    hasInput: PropTypes.bool.isRequired,
    handleSelectTitle: PropTypes.func.isRequired
}


export default Modal;