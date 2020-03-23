import React from 'react';
import InputField from '../common/InputField';
import SelectInput from '../common/SelectField';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import Form from '../common/Form';
import Joi from 'joi';
import http from '../services/Http';
import Auth from '../services/Auth';


class CreateMovie extends Form {
    state = { 
        data: {
            title:'',
            genre:'',
            numberInStock:'',
            rate:'',
            is_like:'0',
        },
        genres: [],
        errors: {}
     }

    //setting the schema for joi validation
    schema = {
        title: Joi.string().required(),
        genre: Joi.string().required(),
        numberInStock: Joi.number().required(),
        rate: Joi.number().required(),
        is_like: Joi.number()
    }

    async componentDidMount() {
        try{
            const {data} = await http.get('http://127.0.0.1:8000/api/genres', { headers: {'Authorization': "Bearer "+ Auth.getToken()}});
            this.setState({
                genres: data
            })
        }catch(ex){
            if(ex.response && ex.response.status === 400){
                console.log('Something went wrong!');
            }
        }
        
     }
    
    handleChange = (e) => {
        const data = {...this.state.data};
        data[e.currentTarget.name] = e.currentTarget.value;
        this.setState({
            data: data
        });
    } 

    async doSubmit(){
        try {
            let { title, genre, numberInStock, rate, is_like } = this.state.data;
            const {data} = await http.post('http://127.0.0.1:8000/api/movie/store', 
                                    { title, genre, numberInStock, rate, is_like },
                                    { headers: {'Authorization': "Bearer "+ Auth.getToken()}}
                                );                   
            if(data){
                window.location = '/movies';
            }                    
        } catch (ex) {
            if(ex.response && ex.response.status === 401){
                let errors = { ...this.state.errors };
                errors.title = ex.response.data.errors.title;
                errors.genre = ex.response.data.errors.genre;
                errors.numberInStock = ex.response.data.errors.numberInStock;
                errors.rate = ex.response.data.errors.rate
                
                this.setState({
                    errors: errors
                })
            }
        }
    }

    render() { 
        const {genres, errors} = this.state;
        const {title, genre, numberInStock, rate, is_like} = this.state.data;
        return ( 
            <main role="main" className="container" style={{padding: 23}}>
                <form onSubmit={this.handleSubmit}>
                    <InputField 
                        label="Title" 
                        name="title" 
                        value={title} 
                        onChange={ this.handleChange } 
                        error={errors.title}/>

                    <SelectInput 
                        label="Genre" 
                        name="genre" 
                        options={ genres } 
                        onChange={ this.handleChange} 
                        value={ genre }
                        error={errors.genre}/>

                    <InputField 
                        label="Number in stock" 
                        type="number" 
                        name="numberInStock" 
                        value={numberInStock} 
                        onChange={ this.handleChange } 
                        error={errors.numberInStock}/>

                    <InputField 
                        label="Rate" 
                        type="number" 
                        name="rate" 
                        value={rate} 
                        onChange={this.handleChange } 
                        error={errors.rate}/>

                    <Checkbox 
                        label="Like"
                        name="is_like"
                        value={ is_like}
                        onChange={ this.handleChange }/>    

                    <Button label="Create"></Button>
                </form>
            </main>
         );
    }
}
 
export default CreateMovie;