import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    constructor(props) {
        super(props);

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(e) {
        const val = e.target.value;
        this.props.onChange(val);
    }

    render() {
        const { options } = this.props;
        return(
            <select onChange={this.handleSelectChange}>
                {options.map((option, i) => (
                    <option
                        key={i} 
                        value={option}
                    >
                        {option}
                    </option>
                ))}
            </select>
        )
    }
}

Modal.propTypes = {
    onChange: PropTypes.func.isRequired,
    optionVal: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired
}


export default Modal;