import React from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import Form from '../common/Form';
import Joi from 'joi';
import http from '../services/Http';
import Auth from '../services/Auth';



class Login extends Form {
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
        password: Joi.string().required()
    } 

    handleChange = (e) => {
        let data = {...this.state.data};
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({
            data: data
        })
    }

    async doSubmit(){
        try {
            const {data} = await http.post('http://127.0.0.1:8000/api/login', { email: this.state.data.email, password: this.state.data.password });
            Auth.setToken(data.token.original);
            window.location = '/';
        } catch (ex) {
            if(ex.response && ex.response.status === 401){
                console.log('Invalid Credientials');
            }
        }
        
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