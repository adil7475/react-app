import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableHeader extends Component {
    state = {  }
    handleSort = (path) => {
        let {sortColumn} = this.props;
        if( sortColumn.path === path ){
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        }else{
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }

        this.props.onSort(sortColumn);
    }

    renderIcon(column){
        const {sortColumn} = this.props;
        if(column.path !== sortColumn.path){
            return null;
        }

        if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
        return <i className="fa fa-sort-desc"></i>
    }

    render() { 
        let { columns } = this.props;
        return ( 
            <thead>
                <tr>
                    { columns.map( column => <th key={ column.path || column.label } onClick={ () => this.handleSort(column.path)}>
                                                { column.label }
                                                { this.renderIcon(column) }
                                             </th>)}
                </tr>
            </thead> );
    }
}

TableHeader.propTypes = {
    columns: PropTypes.array.isRequired,
    sortColumn: PropTypes.object.isRequired
}
 
export default TableHeader;