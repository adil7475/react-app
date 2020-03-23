import React, { Component } from 'react';
import Joi from 'joi';

class Form extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        //call the validator function
        let errors = this.validate();
        //set the errors in the state
        this.setState({
            errors: errors || {}
        });
        
        //if has error return, we don;t want to submit form
        if(errors) return;
    
        this.doSubmit()
    }

    //function for validation
    validate = () => {
        let { error } = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        //if not error
        if(!error) return null;
        const errors = {};
         //loop through validator error and add in errors const according to data fields
        error.details.map( detail => {
            errors[detail.path[0]] = detail.message
        })

        return errors;
    }
}
 
export default Form;