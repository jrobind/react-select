import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
    constructor(props) {
        super(props);
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

export default Modal;