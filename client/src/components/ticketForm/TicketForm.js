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
import './ticketform.scss';
import Loading from '../loading/Loading';
import DescriptionField from '../multilineTextFields/MultilineTextFields';
import { QUERY_ONE_TICKET } from '../../utils/queries';
import Select from 'react-select'
import { useQuery } from "@apollo/client";


const options = [
  {value: 'Low', label: 'Low' },
  {value: 'Medium', label: 'Medium' },
  {value: 'High', label: 'High' }
  ]

const TicketForm = ({ priority, description, type, created, submitter }) => {

  
   
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: 'white', height: '60vh' }} component='form'>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
      <FormHelperText>Priority</FormHelperText>
      {/* <Select
          defaultValue={priorityData}
        >
        <MenuItem value={'high'}>High</MenuItem>
          <MenuItem value={'moderate'}>Moderate</MenuItem>
          <MenuItem value={'low'}>Low</MenuItem>
          </Select> */}

          <Select
          placeholder={priority}
          defaultValue={priority}
          options={options}
          />



        </FormControl>
        <div>
          <div><label>Description</label></div>
          <textarea className="description-text" rows="3" cols="50" defaultValue={description}></textarea>
        </div>
        <div>
          <h5>Submitter</h5>
          <p>{submitter}</p>
        </div>
        <div>
          <h5>Type</h5>
          <p>{type}</p>
        </div>
        <div>
          <h5>Date Created</h5>
          <p>{created}</p>
        </div>
      </Box>
  
    </Container>
  </React.Fragment>
  )
}

export default TicketForm