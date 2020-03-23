import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../services/Auth';

let ProtectedRoute = ({ path, component: Component, ...rest}) => {
    return (
        <Route
            path={ path }
            {...rest}
            render={ (props) => {
                return Auth.isAuthenticated() ? <Component {...props}/> : <Redirect to="/login" />
            }}
        />
    );
}

export default ProtectedRoute;