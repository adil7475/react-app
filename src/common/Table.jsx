import React, { Component } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class Table extends Component {
    state = {  }
    render() { 
        let {columns, data, onSort, sortColumn } = this.props;
        return ( <table className="table">
                    <TableHeader columns={ columns } onSort={ onSort } sortColumn={ sortColumn } />
                    <TableBody data={data} columns={ columns } />
                </table> );
    }
}
 
export default Table;