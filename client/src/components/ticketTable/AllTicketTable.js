import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@apollo/client";
import { QUERY_TICKETS} from "../../utils/queries";
import Loading from '../loading/Loading';

import React from 'react';

const AllTicketTable = () => {

    const { loading: ticketsLoading, data: ticketsData, error} = useQuery(QUERY_TICKETS);
    const [tableData, setTableData] = useState([])

    if (ticketsLoading) return <Loading />;
    if (!ticketsData) return <p>Not Found</p>;
    const getTickets = async () => {
        const tickets = await ticketsData?.allTickets || [];
        setTableData(tickets);
        return console.log(tickets)
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