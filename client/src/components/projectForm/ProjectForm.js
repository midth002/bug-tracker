import React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
// import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField'
import Loading from '../loading/Loading';
import DescriptionField from '../multilineTextFields/MultilineTextFields';
import { QUERY_ONE_TICKET } from '../../utils/queries';
import Select from 'react-select'
import { useQuery, useMutation } from "@apollo/client";
import { SAVE_TICKET_CHANGES } from '../../utils/mutations';
import Button from '@mui/material/Button'




const ProjectForm = ({ projectId, title, description, type, created }) => {
  // const [typeSelectedOption, setTypeSelectedOption] = useState(null);

  const [updateTicket, {error} ] = useMutation(SAVE_TICKET_CHANGES);
  const [projectState, setProjectState] = useState({
      id: projectId,
      title,
      description,
  })


  const handleChange = (event) => {
    const { name, value } = event.target;
    setProjectState({
      ...projectState,
      [name]: value,
    });

  };

  const handleProjectChanges = async (event) => {
    event.preventDefault();
   

    try {
        const { data } = await updateProject({
         
            variables: {
                ...projectState
            }
        })

       console.log("Success", data);
    } catch (e) {
        console.log("failed")
        console.error(JSON.stringify(e, null, 2))
    }
}

   
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: 'white', height: '60vh' }} component='form'>
        <div>
          <div><label>Title</label></div>
          <div><input value={title}></input></div>
          <div><label>Description</label></div>
          <textarea 
          className="description-text" 
          rows="3" cols="50" 
          name="description" 
          defaultValue={description}
          onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <h5>Type</h5>
          <p>{type}</p>
        </div>
        <div>
          <h5>Date Created</h5>
          <p>{created}</p>
        </div>
        <Button onClick={handleProjectChanges} variant="contained">Save Changes</Button>
      </Box>
  
    </Container>
  </React.Fragment>
  )
}

export default ProjectForm