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

const AllTicketTable = ({user}) => {

    const { loading: ticketsLoading, data: ticketsData, error} = useQuery(QUERY_TICKETS);
    const [tableData, setTableData] = useState([])

    if (ticketsLoading) return <Loading />;
    if (!ticketsData) return <p>Not Found</p>;
    const getTickets = async () => {
        const tickets = await ticketsData?.allTickets || [];
        setTableData(tickets);
    }

    getTickets();

  const handleClick = (event, value) => {
    console.log(event, value);
  }
 
  

    const columns = [
        { field: '_id', headerName: 'ID', 
        renderCell: (cellValues) => {
              
          return <Link to={`/${user}/tickets/${cellValues.id}`}>{cellValues.id}</Link>;
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
          width: 100,
          editable: false,
        },
        {
          field: 'status',
          headerName: 'status',
          width: 100,
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
          width: '90%',
          height: 450,
          ml: 20,
          mr: 3,
          mt: 8,
          flexWrap: 'wrap'
      }}            
      >

    

      <div className="ticket-header">
      <h5>All Tickets</h5>
        <TicketModal />
        </div>
    
        <Box 
      className="project-table" 
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ height: 375, width: '100%' }}
      >
    <DataGrid
      rows={tableData}
      getRowId={row => row._id}
      columns={columns}
      pageSize={10}
      rowsPerPageOptions={[5]}
      rowHeight={45}
      headerHeight={30}
    />
    </Box>
    </Box>
  )
}

export default AllTicketTable;