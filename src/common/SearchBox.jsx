import React, { Component } from 'react';

class SearchBox extends Component {
    state = {  }
    render() { 
        return ( 
            <input type="text" name="query" className="form-control my-3" placeholder="Search with title..." onChange={(e) => this.props.onQueryChange(e.currentTarget.value)}/>
         );
    }
}
 
export default SearchBox;