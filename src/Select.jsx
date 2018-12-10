import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: this.props.options,
            selectedOption: null
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(e) {
        const val = e.target.value;

        this.setState(() => ({selectedOption: val}));

        console.log(`current option: ${val}`);
    }

    render() {
        const { options } = this.props;
        return (
            <div>
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
            </div>
        )
    }
}

Select.propTypes = {
    options: PropTypes.array.isRequired
}

export default Select;