import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from 'react-select';
import { CREATE_PROJECT } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  
 const typeOptions = [
    {value: 'Software Development', label: 'Software Development'},
    {value: 'Business', label: 'Business'},
    {value: 'Product Discovery', label: 'Product Discovery'},
    {value: 'Service Management', label: 'Service Management'}
 ]

const ProjectModal = () => {

    const [showModal, setShowModal] = useState(false);
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [typeSelectedOption, setTypeSelectedOption] = useState(null);
   
    const [createProject, {error} ] = useMutation(CREATE_PROJECT);
    const [projectInputs, setProjectInputs] = useState({
        title: '',
        description: ''
    })


  
    const handleChange = (event) => {
        const { name, value } = event.target;
        // const submitPriority = prioritySelectedOption.value
        // const submitType = typeSelectedOption.value
        setProjectInputs({
            // priority: submitPriority,
            // type: submitType,
          ...projectInputs,
          [name]: value,
        });
    
      };
    
  
    const handleProjectFormSubmit = async (event) => {
        event.preventDefault();
        const submitType = typeSelectedOption.value
 
        try {
            const { data } = await createProject({
                variables: {
                    type: submitType,
                    ...projectInputs
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
    <div><Button onClick={handleOpen} >Create a Project</Button></div>
    <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Project
          </Typography>
            <form onSubmit={handleProjectFormSubmit}>
            <TextField id="filled-basic" label="Title" name="title" value={projectInputs.title} variant="standard" onChange={handleChange}/>
            <TextField id="filled-basic" label="Description" name="description" value={projectInputs.description} onChange={handleChange} variant="standard" />
            <Select
         defaultValue={typeSelectedOption}
          onChange={setTypeSelectedOption}
          placeholder="Type"
          options={typeOptions}
        
          />

            <Button type="submit">Create Project</Button>
            </form>
          
          
        </Box>
      </Modal>
  </div>
  )
}

export default ProjectModal