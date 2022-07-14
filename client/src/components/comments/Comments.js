import React from 'react';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import './comments.scss'

const Comments = () => {
  return (
    <Box
        sx={{
            padding: 2
        }}>
        <h4>Comments</h4>
            <hr></hr>
        <TextField size="small"></TextField>
        <Button>Add Comment</Button>
    </Box>
  )
}

export default Comments