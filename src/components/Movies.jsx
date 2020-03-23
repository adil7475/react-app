import React, { Component } from 'react';
import GroupList from '../common/GroupList';
import MovieTable from '../components/MoviesTable';
import Pagination from '../common/Pagination';
import SearchBox from '../common/SearchBox';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import http from '../services/Http';
import Auth from '../services/Auth';
import {Paginate} from '../helper/Paginate';

class Movies extends Component {
    state = { 
        genres: [],
        movies: [],
        sortColumn: { path: "title", order: "asc"},
        pageSize: 2,
        currentPage: 1,
        selectedGenre: 'All Genres',
        query: ''
     }

    async componentDidMount() {
        try{
            const {data} = await http.get('http://127.0.0.1:8000/api/genres', { headers: {'Authorization': "Bearer "+ Auth.getToken()}});
            const genres = [{id: "", name: "All Genres"}, ...data];

            const { data: movies } = await http.get('http://127.0.0.1:8000/api/movies', { headers: {'Authorization': 'Bearer'+ Auth.getToken()}})
            this.setState({
                genres: genres,
                movies: movies
            });
        }catch(ex){
            if(ex.response && ex.response.status === 400){
                console.log('Something went wrong!');
            }
        }
        
    }

    handleSort = (sortColumn) => {
        this.setState({
            sortColumn
        })
    }

    handleLike = (movie) => {
        this.LikeMovie(movie);
    }

    handleDelete = (movie) => {
        this.DeleteMovie(movie);
    }

    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        })
    }

    handleGenreChange = (genre) => {
        this.setState({
            selectedGenre: genre,
            currentPage: 1
        })
    }

    handleQueryChange = (query) => {
        this.setState({
            query,
            currentPage: 1
        })
    }

    pageData() {
        const { movies:data, sortColumn, currentPage, pageSize, selectedGenre, query } = this.state;
        const sortedData = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
        let genreFilter = sortedData;
        if(query){
            genreFilter = genreFilter.filter(data => data.title.toLowerCase().startsWith(query.toLowerCase()));
        }else if(selectedGenre && selectedGenre.id){
            genreFilter = genreFilter.filter(data => data.genre.name === selectedGenre.name);
        }
        
        const movies = Paginate(genreFilter, currentPage, pageSize);

        return {
            movies: movies,
            totalCount: genreFilter.length
        }
    }

    async LikeMovie(movie){
        let movies  = [...this.state.movies];
        //find the index of the required movie
        const index = movies.indexOf(movie);

        try {
            var {data} = await http.get('http://127.0.0.1:8000/api/movie/like/'+ movie.id, 
                            { headers: {'Authorization': "Bearer "+ Auth.getToken()}}
                        );          
            movies[index] = data.data;
            this.setState({
                movies
            })
        } catch (ex) {
            if(ex.response && ex.response.status === 400){
                console.log('Something went wrong');
            }
        }
    }

    async DeleteMovie(movie){
        try {
            const {data} = await http.delete('http://127.0.0.1:8000/api/movie/'+ movie.id, 
                    { headers: {'Authorization': "Bearer "+ Auth.getToken()}}
                )
            if(data){
                let movies = this.state.movies.filter( item => item.id !== movie.id);
                this.setState({
                    movies
                })
            }    
        } catch (error) {
            
        }
    }

    render() { 
        const { movies, totalCount } = this.pageData();
        const { genres, sortColumn, currentPage, pageSize, selectedGenre } = this.state;
        return ( 
            <main role="main" className="container" style={{padding: 23}}>
                <div className="row">
                    <div className="col-2">
                        <GroupList 
                            genres={ genres } 
                            selectedGenre={ selectedGenre } 
                            onGenreChange={ this.handleGenreChange }/>
                    </div>
                    <div className="col">
                        <Link className="btn btn-success btn-primary pull-right m-3" to='/movie/create'>Add New</Link>

                        <SearchBox onQueryChange={ this.handleQueryChange }/>
                        
                        <MovieTable 
                            data={ movies } 
                            onSort={ this.handleSort } 
                            sortColumn={ sortColumn } 
                            onLike={ this.handleLike } 
                            onDelete={ this.handleDelete }/>

                        <Pagination 
                            totalItems={ totalCount } 
                            pageSize={ pageSize } 
                            currentPage={ currentPage } 
                            pageChange={ this.handlePageChange }/>
                    </div>
                </div>
            </main>
         );
    }
}
 
export default Movies;