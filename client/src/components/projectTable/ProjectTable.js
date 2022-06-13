import React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../../utils/queries";


const { loading: staffProjects, data: projectData } = useQuery(QUERY_STAFF_PICKS);
console.log(projectData)

const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    {
      field: 'title',
      headerName: 'Project Name',
      width: 200,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Description',
      width: 250,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      editable: false,
    },
    {
      field: 'date_created',
      headerName: 'Date Created',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 125,
    },
 
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', title: 'Bug tracker', status: 'In-progress', date_created: '5/14/22' },
    { id: 2, lastName: 'Lannister', title: 'Project Poke', status: 'Resolved', date_created: '5/26/22' },
    { id: 3, lastName: 'Lannister', title: 'Brewery API', status: 'Done', date_created: '3/30/22' },
 
  ];
  
 const ProjectTable = () => {
    return (
      <div className="project-table" style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    );
  }

export default ProjectTable;