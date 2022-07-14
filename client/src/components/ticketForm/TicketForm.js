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
import { useQuery, useMutation } from "@apollo/client";
import { SAVE_TICKET_CHANGES } from '../../utils/mutations';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Label } from 'recharts';

const options = [
  {value: 'Low', label: 'Low' },
  {value: 'Medium', label: 'Medium' },
  {value: 'High', label: 'High' }
  ]

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const TicketForm = ({ ticketId, priority, title, description, type, created, submitter }) => {
  // const [typeSelectedOption, setTypeSelectedOption] = useState(null);

  const [prioritySelectedOption, setPrioritySelectedOption] = useState(priority);
  const [updateTicket, {error} ] = useMutation(SAVE_TICKET_CHANGES);
  const [ticketState, setTicketState] = useState({
      id: ticketId,
      description,
      title
  })


  const handleChange = (event) => {
    const { name, value } = event.target;
    setTicketState({
      ...ticketState,
      [name]: value,
    });

  };

  const handleTicketChanges = async (event) => {
    event.preventDefault();
   
    const submitPriority = prioritySelectedOption.value

    try {
        const { data } = await updateTicket({
         
            variables: {
              priority: submitPriority,
                ...ticketState
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
      <Box sx={{ bgcolor: 'white', height: '65vh', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} component='form'>
      <Grid container spacing={4}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'top'
        }}
      >

    


        <Grid item xs={12}>
          <label>Description</label>
         <textarea name='description' defaultValue={description}></textarea>
     </Grid>

        <Grid item xs={4} className="grid-item" align="center">
        <label>Priority</label>
        {/* <Select
          className='select'
          defaultValue={priority}
          onChange={setPrioritySelectedOption}
          placeholder={priority}
          options={options}
          size="small"
          /> */}
     
          <select>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
          </select>
       
        </Grid>


      


        <Grid item xs={4} align="center" display="inline-block" className="grid-item">
            <label>Submitter </label>
            <div><p>{submitter}</p></div>
       </Grid>
        
       <Grid item xs={4} align="center" display="block" className="grid-item">
            <label>Type of Ticket</label>
            <div><p>{type}</p></div>
            
          </Grid>
      
          <Grid item xs={4} align="center" display="block" className="grid-item">
            <label>Created At</label>
            <div><p>{created}</p></div>
            
          </Grid>

          <Grid item xs={4} align="center" display="inline-block" className="grid-item">
            <label>Estimated Time (Hours)</label>
            <div><p>8.5</p></div>
          </Grid>

          <Grid item xs={4} align="center" display="block" className="grid-item">
            <label>Assigned To</label>
            <div><p>{submitter}</p></div>
          </Grid>

          <Grid item xs={8} align="center" display="block" className="grid-item">
             <Button onClick={handleTicketChanges} variant="contained" >Save Changes</Button>
          </Grid>
       
        {/* <Button onClick={handleTicketChanges} variant="contained">Save Changes</Button> */}
        </Grid>
      </Box>

  
  
    </Container>
  </React.Fragment>
  )
}

export default TicketForm