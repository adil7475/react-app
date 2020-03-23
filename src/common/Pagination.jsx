import React, { Component } from 'react';
import _ from 'lodash';
class Pagination extends Component {
    state = {  }
    render() { 
        let { totalItems, pageSize, currentPage, pageChange } = this.props;
        const pageCount = Math.ceil(totalItems/pageSize);
        if(pageCount <= 1) return null;
        const pages = _.range(1, pageCount+1);

        return ( <ul className="pagination">
                        { pages.map( page => <li key={page} className={(currentPage === page) ? "page-item active" : "page-item"}>
                                    <a className="page-link" onClick={ () => pageChange(page)}>
                                        { page }
                                    </a>
                                </li>)}
                     </ul> );
    }
}
 
export default Pagination;