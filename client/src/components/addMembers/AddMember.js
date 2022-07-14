import { useEffect, useState } from 'react'
import { Box, Button} from '@mui/material';
import { useQuery } from "@apollo/client";
import { QUERY_ONE_PROJECT } from "../../utils/queries";
import Loading from '../loading/Loading';
import { DataGrid } from '@mui/x-data-grid';


const AddMember = ({member}) => {

   

    console.log(member)
    const columns = [
        {field: '_id', headerName: 'ID', width: 100, hide: true},
        {
            field: 'username', 
            headerName: 'Name',
            width: 150,
            editable: false,
        }, 
        {
            field: 'email', 
            headerName: 'email',
            width: 220,
            editable: false,
        }
  ];

  




  return (
    <Box
    display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="white"
      sx={{
          boxShadow: 3,
          borderRadius: 2, 
          width: '30%',
          height: 250,
          ml: 20,
          mt: 2,
          flexWrap: 'wrap'
      }}   
        >
    <Box className="member-header" align="top"
    sx={{width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'top',
        ml: 2
        
        }}>
        <h5>Team </h5>
        <Button>Add Member</Button>
    </Box>

    <Box 
    sx={{
        width: '100%',
        height: 185,
    }}
    >
    <DataGrid
          rows={member}
          getRowId={row => row._id}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[2]}
          rowHeight={30}
          headerHeight={20}
          sx = {{
            border: 0,
          }}
        />
    </Box>


    </Box>
  )
}

export default AddMember