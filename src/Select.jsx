import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: this.props.options,
            selectedOption: null
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(e) {
        const val = e.target.value;

        this.setState(() => ({selectedOption: val}));

        console.log(`current option: ${val}`);
    }

    render() {
        const { options } = this.props;
        return (
            <div>
                {options.map((option, i) => (
                    <select key={i}>
                        <option value={option}>
                            {option}
                        </option>
                    </select>
                ))}
            </div>
        )
    }
}

Select.propTypes = {
    options: PropTypes.array.isRequired
}

export default Select;