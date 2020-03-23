import React, { Component } from 'react';
import Table from '../common/Table';
import { Link } from 'react-router-dom';
import Like from '../common/Like';

class MoviesTable extends Component {
    state = {  }
    columns = [
        {path: 'title', label: 'Title', content: (movie) => <Link to={`movie/${movie.id}`}>{ movie.title}</Link>},
        {path: 'genre.name', label: "Genre"},
        {path: 'numberInStock', label: "Number in stock"},
        {path: 'like', label: 'like', content: (movie) => <Like isLike={movie.is_like} onLike={() => this.props.onLike(movie)}></Like>},
        {path: 'rate', label: "Rating"},
        {path: 'action', content: (movie) => <button className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(movie)}><i className="fa fa-trash"></i></button>}
    ]
    render() { 
        let {data, onSort, sortColumn } = this.props;
        return ( 
            <Table columns={ this.columns } data={data} onSort={ onSort } sortColumn={ sortColumn }/>
         );
    }
}
 
export default MoviesTable;