import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputField extends Component {
    state = {  }
    render() { 
        let { id, label, type, name, value, onChange, error } = this.props;
        return ( 
            <div className="form-group">
                <label htmlFor={ id } className="label">{ label }</label>
                <input id={id} type={ type }  name={ name } value={ value } className="form-control" onChange={ onChange }/>
                {error && <span className="text-danger">{ error }</span>}
            </div>
         );
    }
}

InputField.defaultValue = {
    type: 'text'
}

InputField.propType = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
}
export default InputField;