import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
class Button extends Component {
    state = {  }
    render() { 
        let {label, sizeClass } = this.props;
        return ( 
            <button className={"btn btn-primary "+ sizeClass } type="submit">{ label }</button>
         );
    }
}

Button.defaultValue = {
    sizeClass: 'btn-lg'
}

Button.propType = {
    label: PropTypes.string.isRequired,
    sizeClass: PropTypes.string
}
export default Button;