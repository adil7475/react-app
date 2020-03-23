import React, { Component } from 'react';

class Checkbox extends Component {
    state = {  }
    render() { 
        const {label, name, value, onChange} = this.props;
        return ( 
            <div className="form-group">
                <label htmlFor={label}>
                    <input type="checkbox" name={name} value={ (value === '1') ? '0' : '1'} onChange={ (e) => onChange(e)}/> { label}
                </label> 
            </div>
        );
    }
}
 
export default Checkbox;