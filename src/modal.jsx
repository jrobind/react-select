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
        this.props.handleSelectTitle(val);  
    }

    handleOptionHighlighting(e) {
        const { filteredOptions } = this.state;
        let uid;
        // enter key case
        if (e.type === 'submit') {
            
        } else {
            uid = e.target.getAttribute('uid');
        }

        this.setState(() => ({ selectedUid: uid }));
        // remove any select attributes
        Array.from(e.target.parentElement.children)
            .forEach((option) => option.hasAttribute('selected') && option.removeAttribute('selected'));
        // set attribute so we can highlight selected option
        e.target.setAttribute('selected', '');
    }

    handleOptionSearch(e) {
        const { options } = this.state.optionsWithId;
        const optionsFormattted = options.map(option => option.val.toLowerCase());
        const val = e.target.value.toLowerCase();

        // set filtering state and filter val
        this.setState(() => ({filtering: true, filterVal: val}));
        // auto select matching options based on presence of letters
        this.setState(() => ({filteredOptions: optionsFormattted.filter(option => option.val.includes(val))}));
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