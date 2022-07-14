import React from 'react'
import { Box, Button } from '@mui/material';





const AddMember = ({project}) => {

    const columns = [
        {field: '_id', headerName: 'ID', width: 100},
        {
            field: 'username', 
            headerName: 'Name',
            width: 100,
            editable: false,
        }, 
        {
            field: 'email', 
            headerName: 'email',
            width: 150,
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
          height: 200,
          ml: 20,
          mt: 2,
          flexWrap: 'wrap'
      }}   
        >
    <div className="member-header">
        <h5>Team </h5>
        <Button>Add Member</Button>
    </div>


    </Box>
  )
}

export default AddMember