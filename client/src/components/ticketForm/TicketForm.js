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
import Select from '@mui/material/Select';
import './ticketform.scss';
import Loading from '../loading/Loading';
import DescriptionField from '../multilineTextFields/MultilineTextFields';
import { QUERY_ONE_TICKET } from '../../utils/queries';
import { useQuery } from "@apollo/client";

const TicketForm = ({ ticketId }) => {
   
  const {loading: ticketLoading, data: ticketData, refetch} = useQuery(QUERY_ONE_TICKET, {
    variables: {ticketId: ticketId}
});


if (ticketLoading) return <Loading />; 

const data = ticketData?.getOneTicket || [];
const priorityData = data.priority;
const descriptionData = data.description
    
  
   
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: 'white', height: '60vh' }} component='form'>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
      <FormHelperText>Priority</FormHelperText>
      <Select
          defaultValue={priorityData}
        >
        <MenuItem value={'high'}>High</MenuItem>
          <MenuItem value={'moderate'}>Moderate</MenuItem>
          <MenuItem value={'low'}>Low</MenuItem>
          </Select>
        </FormControl>
        <DescriptionField description={descriptionData}/>
      </Box>
  
    </Container>
  </React.Fragment>
  )
}

export default TicketForm