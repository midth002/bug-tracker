import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../../utils/queries";
import Loading from '../loading/Loading';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

 const ProjectTable = ({user}) => {


  const { loading: projectsLoading, data: projectData, error} = useQuery(QUERY_PROJECTS);
  const [tableData, setTableData] = useState([])

  if (projectsLoading) return <Loading />;
  if (!projectData) return <p>Not found</p>;
  const getProjects = async () => {
    const projects = await projectData?.allProjects || [];
    setTableData(projects);
    console.log(projects);
  }

  getProjects();

  const columns = [
    { field: '_id', 
    headerName: 'ID',  
    
    headerClassName: 'header-style', 
    renderCell: (cellValues) => {
              
      return <Link to={`/projects/${cellValues.id}`}>{cellValues.id}</Link>;
    }
    ,width: 100 },
    {
      field: 'title',
      headerName: 'Project Name',
   
      headerClassName: 'header-style',
      width: 250,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
     
      headerClassName: 'header-style',
      width: 500,
      editable: false,
    },
    {
      field: "edit",
      headerName: "Edit",
     
      headerClassName: 'header-style',
      sortable: false,
      width: 130,
      disableClickEventBubbling: true,
      renderCell: () => {
        
        return (
          <Button variant="contained" color="primary" startIcon={<EditIcon />} style={{maxWidth: '100px', maxHeight: '25px', minWidth: '30px', minHeight: '20px', fontSize: '12px'}}>
          Edit
        </Button>
        );
      }
    }
 
  ];



 
   
    return (
      <Box 
      className="project-table" 
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ height: 225, width: '100%' }}
      >
     
        <DataGrid
          rows={tableData}
          getRowId={row => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          rowHeight={30}
          headerHeight={20}
        />
      </Box>
    );
  }

export default ProjectTable;