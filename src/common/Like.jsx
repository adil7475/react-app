import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Like extends Component {
    state = {  }
    render() { 
        let {isLike} = this.props;
        let heart = 'fa fa-heart';
        if(isLike){
            heart += '-o';
        }
        return ( 
            <i className={ heart } onClick={ () => this.props.onLike(this.props.movie) }></i>
         );
    }
}
 
Like.propType = {
    isLike: PropTypes.isRequired,
    onLike: PropTypes.func.isRequired
}
export default Like;