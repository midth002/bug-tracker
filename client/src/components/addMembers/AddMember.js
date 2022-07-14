import React from 'react'
import { Box, Button } from '@mui/material';



  const columns = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


const AddMember = () => {
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
          mr: 3,
          mt: 8,
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