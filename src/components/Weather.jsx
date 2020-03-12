import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {
    state = { 
        showResult: false,
        search: ''
     }

    handleChange = (e) => {
        this.setState({
            search: e.currentTarget.value
        })
    } 

    handleSearchWeather = () => {
        const config = {
            headers : { 'Access-Control-Allow-Origin': '*'}
        };
        const result = axios.post(`https://api.darksky.net/forecast/8a3015f7b3662b6ad3a8f544c8bb3304/37.8267,-122.4233`, config);
        console.log(result);
    }

    render() { 
        return ( 
            <div className="row">
                <div className="col-md-12">
                    <div className="col-md-4 col-md-offset-4 p-4 m-auto">
                        <h3 className="text-center">Get Your Forecast</h3>
                        <input className="form-control p-4" placeholder="longitute, latidute..." type="text" style={{fontWeight:'bolder', fontSize: 20}}
                            onChange={ this.handleChange }
                        />
                        <button className="btn btn-success m-2" onClick={ this.handleSearchWeather }>Search</button>
                    </div>
                </div>

                {(this.state.showResult && <div className="col-md-12">
                    <div className="col-md-4 col-md-offset-4 m-auto" style={{ border: '2px solid #f6f6f6'}}>
                        <h3 className="text-center">Results</h3>
                    </div>
                </div>)}
            </div>
         );
    }
}
 
export default Weather;