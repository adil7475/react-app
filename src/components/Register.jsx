import React, { Component } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import Joi from 'joi';

class Register extends Component {
    state = { 
        data: {
            email: '',
            password: '',
            username: ''
        },
        errors: {}
     }

    //setting validation schema for joi form validation
    schema = {
        email: Joi.string().email().required(),
        password: Joi.string().required().min(3),
        username: Joi.string().required().min(2)
    } 
    
    handleChange = (e) => {
        const data = {...this.state.data};
        data[e.currentTarget.name] = e.currentTarget.name;
        this.setState({
            data: data
        });
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

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        //set the errors in the state
        this.setState({
            errors: errors || {}
        })
        //if has error return, we don;t want to submit form
        if(errors) return;

        console.log('submit')
    }
     
    render() { 
        let {data, errors} = this.state;
        return ( 
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={ this.handleSubmit }>
                        <h2 className="text-center">Register</h2>
                        <div className="col-md-4" style={{ margin: 'auto' }}>
                            <InputField 
                                label="Email" 
                                id="email"
                                name="email" 
                                value={ data.email} 
                                onChange={ this.handleChange }
                                error={ errors.email }
                            />
                            <InputField 
                                label="Password" 
                                id="password" 
                                type="password" 
                                name="password" 
                                value={ data.password } 
                                onChange={ this.handleChange }
                                error={ errors.password }
                            />

                            <InputField 
                                label="Username" 
                                id="username"  
                                name="username" 
                                value={ data.username } 
                                onChange={ this.handleChange }
                                error={ errors.username }
                            />  

                            <Button label="Login" sizeClass="btn-block" /> 
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment> );
    }
}
 
export default Register;