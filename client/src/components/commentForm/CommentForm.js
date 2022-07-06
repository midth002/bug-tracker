import React from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const CommentForm = () => {
  return (
    <div>
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <FormHelperText>Discussion</FormHelperText>
      <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows="4"
          defaultValue="Default Value"
          margin="normal"
          variant="outlined"
        />
    </FormControl>
    </div>


  )
}

export default CommentForm