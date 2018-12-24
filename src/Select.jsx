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

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange() {
        this.setState((prevState) => ({selectedOption: !prevState.selectedOption}), () => console.log('reaching'));
    }

    render() {
        const { selectedOption, optionVal } = this.state;

        return (
            <div>
                <div onClick={this.handleSelectChange}>
                    {optionVal}
                    <span>&#9662;</span>
                </div>
                {selectedOption ? <Modal {...this.props}/> : null}
            </div>
        )
    }
}

Select.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Select;