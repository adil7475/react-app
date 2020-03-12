import React, { Component } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import Joi from 'joi';

class Login extends Component {
    state = { 
        data: {
            email: '',
            password: ''
        },
        errors:{}
     }
    
    //setting the schema for joi validation
    schema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required()
    } 

    handleChange = (e) => {
        let data = {...this.state.data};
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({
            data: data
        })
    }
    
    validate = () => {
        let {error} = Joi.validate(this.state.data, this.schema, { abortEarly: false });
        //if validator return no error
        if(!error) return null;
        const errors = {...this.state.errors};
        //loop through validator error and add in errors const according to data fields
        error.details.map( detail => {
            errors[detail.path[0]] = detail.message
        })
        //return the error object
        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //call the validator function
        let errors = this.validate();
        //set the errors in the state
        this.setState({
            errors: errors || {}
        })
        //if has error return, we don;t want to submit form
        if(errors) return;

        console.log('submit');
    }

    render() { 
        let { data, errors } = this.state;
        return ( 
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={ this.handleSubmit }>
                            <h2 className="text-center">Login</h2>
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

                                <Button label="Login" sizeClass="btn-block" /> 
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Login;