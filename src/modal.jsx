import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = () => (
    <div className='modal-error-message'>
        <p>Please select one option.</p>
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
        }

        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.handleOptionSearch = this.handleOptionSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSelectClick(e, submissionVal) {
        const val = e ? e.target.innerText : submissionVal;
        this.props.onClick(val);
        this.props.handleSelectTitle(val);
    }

    handleOptionSearch(e) {
        console.log(e.target.value)
        const { options } = this.props;
        const optionsFormattted = options.map(option => option.toLowerCase());
        const val = e.target.value.toLowerCase();

        // set filtering state and filter val
        this.setState(() => ({filtering: true, filterVal: val}));
        // auto select matching options based on presence of letters
        this.setState(() => ({filteredOptions: optionsFormattted.filter(option => option.includes(val))}));
    }

    handleSubmit(e) {
        const { filteredOptions } = this.state;
        e.preventDefault();
        // only allow submission via enter key if one option value is filtered
        if (filteredOptions.length === 1) {
            this.setState(() => ({alertMessage: false}));
            this.handleSelectClick(null, filteredOptions[0]);
        } else {
            // inform user if not
            this.setState(() => ({alertMessage: true}));
        }
    }

    render() {
        const { options, optionVal, hasInput } = this.props;
        const { filtering, filteredOptions, alertMessage } = this.state;
        const optionsToRender = filtering ? filteredOptions : options;

        return(
            <div className='modal-container'>
                <div className='modal-title'>
                    {optionVal}
                </div>
                {hasInput ? 
                    <form 
                        onSubmit={this.handleSubmit}
                        className='modal-input-container'
                    >
                        {alertMessage ? <ErrorMessage/> : null}
                        <input 
                            className={alertMessage ? 'modal-input-error' : 'modal-input'}
                            value={this.state.filterVal}
                            onChange={this.handleOptionSearch}
                            type='text'></input>
                    </form> : null}
    
                <ul>
                    <div onClick={this.handleSelectClick}>
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
        )
    }
}

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    optionVal: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    hasInput: PropTypes.bool.isRequired,
    handleSelectTitle: PropTypes.func.isRequired
}


export default Modal;