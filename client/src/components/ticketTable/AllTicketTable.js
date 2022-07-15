import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@apollo/client";
import { QUERY_TICKETS} from "../../utils/queries";
import Loading from '../loading/Loading';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import React from 'react';
import Box from '@mui/material/Box';
import TicketModal from '../ticketModal/TicketModal';
import Grid from '@mui/material/Grid'
import './ticketTable.scss'

const AllTicketTable = ({user, ticket}) => {
 
    const columns = [
        { field: '_id', headerName: 'ID',  
        renderCell: (cellValues) => {
              
          return <Link to={`/tickets/${cellValues.id}`}>{cellValues.id}</Link>;
        },
        
        width: 200 },
        {
          field: 'title',
          headerName: 'Ticket Name',
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
          field: 'priority',
          headerName: 'Priority',
          width: 80,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'status',
          width: 80,
          editable: false,
        }
      ];
    

     



  return (
    <Box className="ticket-table" 
     display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="white"
      sx={{
          boxShadow: 3,
          borderRadius: 2, 
          width: '100%',
          flexWrap: 'wrap',
          height: 325
      }}            
      >

    

      <div className="ticket-header">
      <h5>Tickets</h5>
        <TicketModal user={user}/>
        </div>
    
        <Box 
      className="project-table" 
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ width: '100%'}}
      >
    <DataGrid
      rows={ticket}
      getRowId={row => row._id}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      rowHeight={45}
      headerHeight={30}
      sx={{border: 'none', height: 250}}
    />
    </Box>
    </Box>
  )
}

export default AllTicketTable;