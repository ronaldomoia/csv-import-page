import React, { Component }  from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import api from './api';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }
  
    processCsv = async file => {
      const data = new FormData();
      data.append("file", file);
      const response = await api.post('/process-csv', data);
      this.setState({tableData: response.data})
    }

    handleFileUpload = async e => {
      const file = e.target.files[0];
      await this.processCsv(file);
    }

    render () {
      const columnData = [
        { id: 'name', disablePadding: false, label: 'name' },
        { id: 'mail', disablePadding: false, label: 'mail' },
        { id: 'birthdate', disablePadding: false, label: 'birthdate' },
      ];

    return (
      <div>
        <h3> Grupo Falconi - Tratamento de CSV </h3>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={this.handleFileUpload}
        />
         <Table aria-labelledby="tableTitle">
          {this.state.tableData.length
            ? (
              <TableHead>
                <TableRow>
                  {columnData.map(column => {
                    return (
                      <TableCell
                        key={column.id}
                      >
                        <TableSortLabel>
                          <center>{column.label}</center>
                        </TableSortLabel>
                      </TableCell>
                    );
                  }, this)}
                </TableRow>
              </TableHead>
            ) : null }
          <TableBody>
            {this.state.tableData.map(data => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={`${data.mail}${data.birthdate}`}
                >
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.mail}</TableCell>
                  <TableCell>{data.birthdate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
    }
  }
 
export default List;