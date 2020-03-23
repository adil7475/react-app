import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GroupList extends Component {
    state = {  }
    render() { 
        let { genres, valueProperty, textProperty, selectedGenre, onGenreChange } = this.props;
        return ( 
            <ul className="list-group">
                { genres.map( genre => <li  className={ (selectedGenre === genre ) ? "list-group-item active" : "list-group-item"} 
                                            key={ genre[valueProperty] }
                                            onClick={ () => onGenreChange(genre)}>
                                                { genre[textProperty] }
                                        </li>)}
            </ul>
         );
    }
}

GroupList.defaultProps = {
    valueProperty: 'id',
    textProperty: 'name'
}

GroupList.propTypes = {
    genres: PropTypes.array.isRequired,
}
 
export default GroupList;