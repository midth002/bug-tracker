import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@apollo/client";
import { QUERY_TICKETS} from "../../utils/queries";
import Loading from '../loading/Loading';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import React from 'react';

const AllTicketTable = ({user}) => {

    const { loading: ticketsLoading, data: ticketsData, error} = useQuery(QUERY_TICKETS);
    const [tableData, setTableData] = useState([])

    if (ticketsLoading) return <Loading />;
    if (!ticketsData) return <p>Not Found</p>;
    const getTickets = async () => {
        const tickets = await ticketsData?.allTickets || [];
        setTableData(tickets);
    }

   const showTicketId = () => {
    console.log('this worked');
   }


  const handleClick = (event, value) => {
    console.log(event, value);
  }
 
    getTickets();

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
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
          width: 110,
          editable: false,
        },
        {
            field: "Edit",
            renderCell: (cellValues) => {
              return (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    handleClick(event, cellValues);
                  }}
                >
                  Edit
                </Button>
              );
            }
          },
          {
            field: "Route",
            renderCell: (cellValues) => {
              
              return <Link to={`/${user}/tickets/${cellValues.id}`}>Open Ticket</Link>;
            }
          }
      ];
    

     



  return (
    <div className="ticket-table" style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={tableData}
      getRowId={row => row._id}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
    </div>
  )
}

export default AllTicketTable;