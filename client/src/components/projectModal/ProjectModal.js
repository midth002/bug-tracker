import React, { useState } from 'react'
import Select from 'react-select';
import { CREATE_PROJECT } from '../../utils/mutations';
import UserList from '../userList/UserList';
import Notification from '../notification/Notification';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_USERS } from '../../utils/queries';
import {
   Alert,
   Box, 
   Button, 
   Typography,
   Modal, 
   TextField, 
   Snackbar,
  } from '@mui/material'
import { set } from 'mongoose';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
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

    const [notification, setNotification] = useState(false)
    const [typeSelectedOption, setTypeSelectedOption] = useState(null);
    const [memberData, setMemberData] = useState();
    const [errorMsgToggle, setErrorMsgToggle] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
   
    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
   
    const [createProject, {error} ] = useMutation(CREATE_PROJECT);
    const [projectInputs, setProjectInputs] = useState({
        title: '',
        description: ''
    })


    const {loading, data, error: userError } = useQuery(ALL_USERS);
    if (!data) return <p>No users Found</p>;
    const userList = data?.allUsers || [];

    const childToParent = (childdata) => {
      setMemberData(childdata);
    }

    

    const handleAlertOpen = () => {
      setNotification(true)
  }

  const handleAlertClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
     
      setNotification(false);
      setErrorMsg(false);
      setErrorMsgToggle(false);
    }

  
    const handleChange = (event) => {
        const { name, value } = event.target;
       
        setProjectInputs({
          ...projectInputs,
          [name]: value,
        });
    
      };
    
    const handleProjectFormSubmit = async (event) => {
        event.preventDefault();
        
        if (typeSelectedOption == null) {
          setErrorMsgToggle(true);
          setErrorMsg('Please Enter a Type of Project')
          return;
        }
        const submitType = typeSelectedOption.value

        
 
        try {
            const { data } = await createProject({
                variables: {
                    type: submitType,
                    ...projectInputs,
                    members: memberData,
                }  
            })

            
           console.log("Success", data);
           setShowModal(false);
           setNotification(true);
        
          
        } catch (e) {
            console.log("failed")
            console.error(JSON.stringify(e, null, 2))
            setErrorMsgToggle(true);
            setErrorMsg('Request was not sent! Please make sure Title, Description, and Type is entered.')
        }
        
    }

    

  return (
    <div>
    <div><Button onClick={handleOpen} style={{maxWidth: '200px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', fontSize: '12px'}}>Create a Project</Button></div>
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
            <TextField id="filled-basic" label="Title" name="title" value={projectInputs.title} variant="outlined" onChange={handleChange} size="small" sx={{my:1, width: '100%'}} />
            <TextField 
            id="filled-basic" 
            name="description"
            label="Project Description"
            value={projectInputs.description} 
            onChange={handleChange} 
            variant="outlined"
            sx={{my:1, width: '100%'}}
            multiline
            minRows={4}
            maxRows={4}
            />
            <Select
          defaultValue={typeSelectedOption}
          onChange={setTypeSelectedOption}
          placeholder="Type"
          options={typeOptions}
        
          />

          <UserList usernameList={userList} childToParent={childToParent}/>

           
            <Button type="submit" color="success"  variant="contained" sx={{mt:2}}>Create Project</Button>
           { errorMsgToggle ? (
            <Alert onClose={handleAlertClose} severity="error" sx={{ width: '80%' }}>
                 {errorMsg}
             </Alert>
           ) : (
            <></>
           )
            
           }
            </form>
          
          
        </Box>
      </Modal>

  
      <Snackbar open={notification} autoHideDuration={6000} onClose={handleAlertClose}>
             <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                 Project Created!
             </Alert>
            </Snackbar>   
  
  </div>
  )
}

export default ProjectModal