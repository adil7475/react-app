import React from 'react';
import InputField from '../common/InputField';
import SelectInput from '../common/SelectField';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import Form from '../common/Form';
import Joi from 'joi';
import http from '../services/Http';
import Auth from '../services/Auth';

class EditMovie extends Form {
    state = { 
        data: {
            id:'',
            title:'',
            genre:'',
            numberInStock:'',
            rate:'',
            is_like:'0',
        },
        genres: [],
        errors: {}
     }

     async componentDidMount() {
        try{
            let movie_id = this.props.match.params.id;
            const {data} = await http.get('http://127.0.0.1:8000/api/genres', { headers: {'Authorization': "Bearer "+ Auth.getToken()} });
            const {data: movie} = await http.get('http://127.0.0.1:8000/api/movie/'+ movie_id, { headers: {'Authorization': "Bearer "+ Auth.getToken()} });
            this.mapToMovieData(movie);
            this.setState({
                genres: data
            })
        }catch(ex){
            if(ex.response && ex.response.status === 400){
                console.log('Something went wrong!');
            }
        }
        
     }

    mapToMovieData(movie){
        this.setState({
            data:{
                id: movie.data.id,
                title: movie.data.title,
                genre: movie.data.genre.name,
                numberInStock: movie.data.numberInStock,
                rate: movie.data.rate,
                is_like: movie.data.is_like 
            }
        });
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
            let { id, title, genre, numberInStock, rate, is_like } = this.state.data;
            const {data} = await http.put('http://127.0.0.1:8000/api/movie/update/'+ id, 
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

    render() { 
        let { title, genre, numberInStock, rate, is_like } = this.state.data;
        let { genres, errors } = this.state;
        return ( <main role="main" className="container" style={{padding: 23}}>
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
                </main> );
    }
}
 
export default EditMovie;