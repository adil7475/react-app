import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class TableBody extends Component {
    state = {  }

    renderCell = (item, column) => {
        //content is a function need specific data in a parameter
        if(column.content) return column.content(item);
        //else
        return _.get(item, column.path);
    }

    createKey = (item, column) => {
        return item.id + (column.path || column.title)
    }

    render() { 
        let { data, columns } = this.props;
        return ( 
            <tbody>
                { data.map(item => <tr key={ item.id }>
                 { columns.map( column => <td key={this.createKey(item, column)}>{ this.renderCell(item, column) }</td>)}
                </tr>)}
            </tbody>
         );
    }
}

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired
}
 
export default TableBody;