import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../../utils/queries";
import Loading from '../loading/Loading';

import React from 'react'

const AllTicketTable = () => {

    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
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
          field: 'status',
          headerName: 'Status',
          width: 110,
          editable: false,
        },
     
      ];
    

      const rows = [
        {id: 1, description: 'my own description', status: 'not done'},
      ]



  return (
    <div className="ticket-table" style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
    </div>
  )
}

export default AllTicketTable;