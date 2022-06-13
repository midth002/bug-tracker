import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../../utils/queries";
import Loading from '../loading/Loading';



 const ProjectTable = () => {


  const { loading: projectsLoading, data: projectData, error} = useQuery(QUERY_PROJECTS);
  const [tableData, setTableData] = useState([])

  if (projectsLoading) return <Loading />;
  if (!projectData) return <p>Not found</p>;
  const getProjects = async () => {
    const projects = await projectData?.allProjects || [];
    setTableData(projects);
    return console.log(typeof projects);
  }

  getProjects();

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'title',
      headerName: 'Project Name',
      width: 200,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 350,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      editable: false,
    },
 
  ];


  
  const rows = [
    { id: 1, lastName: 'Snow', title: 'Bug tracker', status: 'In-progress', date_created: '5/14/22' },
    { id: 2, lastName: 'Lannister', title: 'Project Poke', status: 'Resolved', date_created: '5/26/22' },
    { id: 3, lastName: 'Lannister', title: 'Brewery API', status: 'Done', date_created: '3/30/22' },
 
  ];
  

 
   
    return (
      <div className="project-table" style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={tableData}
          getRowId={row => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    );
  }

export default ProjectTable;