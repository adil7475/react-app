import React from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import Form from '../common/Form';
import Joi from 'joi';
import http from '../services/Http';
import auth from '../services/Auth';

class Register extends Form {
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
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({
            data: data
        });
    }

    async doSubmit() {
        try {
            const {data} = await http.post('http://127.0.0.1:8000/api/register/user', {
                username: this.state.data.username,
                email: this.state.data.email,
                password: this.state.data.password
            });
            //setting the token in localstorage
            auth.setToken(data.token.original);
            this.props.history.push('/weather');
        } catch (ex) {
            //if form has validation errors then 
            if(ex.response && ex.response.status === 401){
                let errors = { ...this.state.errors };
                errors.username = ex.response.data.errors.username;
                errors.email = ex.response.data.errors.email;
                errors.password = ex.response.data.errors.password;
                
                this.setState({
                    errors: errors
                })
            }
        }
        
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

                            <Button label="Register" sizeClass="btn-block" /> 
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment> );
    }
}
 
export default Register;