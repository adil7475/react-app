import { Component } from 'react';

class Logout extends Component {
    componentDidMount(){
        localStorage.removeItem('token');
        localStorage.removeItem('expiry');

        window.location = '/';
    }

    render() { 
        return null;
    }
}
 
export default Logout;