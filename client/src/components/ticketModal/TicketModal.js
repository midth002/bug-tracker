import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from 'react-select';
import { CREATE_TICKET } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    height: 'auto'
   
  };

  const options = [
    {value: 'Low', label: 'Low' },
    {value: 'Medium', label: 'Medium' },
    {value: 'High', label: 'High' }
    ]
  
 const typeOptions = [
    {value: 'story', label: 'Story'},
    {value: 'bug', label: 'Bug'},
    {value: 'task', label: 'Task'},
    {value: 'subtask', label: 'Sub Task'}
 ]

const TicketModal = ({user}) => {

    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [typeSelectedOption, setTypeSelectedOption] = useState(null);
    const [prioritySelectedOption, setPrioritySelectedOption] = useState(null);

    const [createTicket, {error} ] = useMutation(CREATE_TICKET);
    const [ticket, setTicket] = useState({
        submitter: user,
        title: '',
        description: ''
    })


  
    const handleChange = (event) => {
        const { name, value } = event.target;
        // const submitPriority = prioritySelectedOption.value
        // const submitType = typeSelectedOption.value
        setTicket({
            // priority: submitPriority,
            // type: submitType,
          ...ticket,
          [name]: value,
        });
    
      };
    
  
    const handleTicketFormSubmit = async (event) => {
        event.preventDefault();
         const submitPriority = prioritySelectedOption.value
        const submitType = typeSelectedOption.value
 
        try {
            const { data } = await createTicket({
                variables: {
                   priority: submitPriority,
                    type: submitType,
                    ...ticket
                }
            
                
            })

           console.log("Success", data);
        } catch (e) {
            console.log("failed")
            console.error(JSON.stringify(e, null, 2))
        }
    }

  return (
    <div>
    <div><Button onClick={handleOpen} color="success" variant="contained" style={{maxWidth: '200px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '12px'}}>Create Ticket</Button></div>
    <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Ticket
          </Typography>
            <form onSubmit={handleTicketFormSubmit}>
            <TextField id="filled-basic" label="Title" name="title" value={ticket.title} variant="outlined" onChange={handleChange} size="small" sx={{my:2, width: '100%'}}/>
            <TextField  
            id="filled-basic" 
            name="description"
            label="Project Description"
            value={ticket.description} 
            onChange={handleChange} 
            variant="outlined"
            sx={{my:2, width: '100%'}}
            multiline
            minRows={6}
            maxRows={6} />
            <Select
         defaultValue={typeSelectedOption}
          onChange={setTypeSelectedOption}
          placeholder="Type"
          options={typeOptions}
         
       
        
          />
            <Select
          defaultValue={prioritySelectedOption}
          onChange={setPrioritySelectedOption}
          placeholder="Priority"
          options={options}
          sx={{mt: 2}}
         
          />

            <Button type="submit" color="success" variant="contained" sx={{mt:2}}>Create Ticket</Button>
            </form>
          
          
        </Box>
      </Modal>
  </div>
  )
}

export default TicketModal