import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
    state = {  }
    render() { 
        let { user } = this.props;
        return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/">React App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/weather" className="nav-link">Weather</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/movies" className="nav-link">Movies</NavLink>
                    </li>
                    {(!user && <React.Fragment>
                        <li className="nav-item">
                        <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/register" className="nav-link">Register</NavLink>
                        </li>
                    </React.Fragment>)}

                    {(user && <React.Fragment>
                        <li className="nav-item">
                        <NavLink to="/" className="nav-link">{ user.name }</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/logout" className="nav-link">Logout</NavLink>
                        </li>
                    </React.Fragment>)}
                </ul>
            </div>
        </nav>  );
    }
}
 
export default Navbar;