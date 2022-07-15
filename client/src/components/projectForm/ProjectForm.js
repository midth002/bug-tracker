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
import './projectForm.scss';


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
    
      <Box sx={{ 
        bgcolor: 'white',
         boxShadow: 3,
        borderRadius: 2,
        width: '100%',
        padding: 1,
        height: 150,
        mr: 5,
        display: 'flex', 
        justifyContent: 'center',
        flexWrap: 'wrap'
            }} 
     >
        <div className="area-div">
          <label>Description</label>
          <textarea 
          className="description-text" 
          rows="3" cols="30" 
          name="description" 
          defaultValue={description}
          onChange={handleChange}
          ></textarea>
        </div>
        <div>
        <label>Type of Project</label>
            <div className="div-value"><p>{type}</p></div>
        </div>
        <div>
        <label>Created At</label>
        <div><p>{created}</p></div>
        </div>
        {/* <Button onClick={handleProjectChanges} variant="contained">Save Changes</Button> */}

      
      </Box>
  
  )
}

export default ProjectForm