import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Weather from './components/Weather';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound'; 
import CreateMovie from './components/CreateMovie';
import Movies from './components/Movies';
import EditMovie from './components/EditMovie';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './common/ProtectedRoute';
import './App.css';

class App extends Component {
  state = {
  }

  componentDidMount() {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      this.setState({
        user
      })
    } catch (ex) {
      //nothing
    }
    
  }

  render() { 
    return (
      <React.Fragment>
        <Navbar user={ this.state.user } />
        <Switch>
          <Route path="/login" component={ Login }></Route>
          <Route path="/register" component={ Register }></Route>
          <ProtectedRoute path="/logout" component={ Logout }></ProtectedRoute>
          <ProtectedRoute path="/weather" component={ Weather }></ProtectedRoute>
          <ProtectedRoute path="/movies" component={ Movies }></ProtectedRoute>
          <ProtectedRoute path="/movie/create" component={ CreateMovie }></ProtectedRoute>
          <ProtectedRoute path="/movie/:id" component={ EditMovie }></ProtectedRoute>
          <Redirect from='/' exact to="/movies" />
          <Route path="/not-found" component={ NotFound }></Route>
          <Redirect to="/not-found"></Redirect>
          
        </Switch>
      </React.Fragment>
      
  );
  }
}

export default App;
