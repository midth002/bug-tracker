import React, { useState } from 'react'
import {Box, Button, Typography, Modal, TextField, Alert, Snackbar} from '@mui/material'
import Select from 'react-select';
import { CREATE_TICKET, ADD_TICKET_TO_PROJECT } from '../../utils/mutations';
import { QUERY_PROJECTS, ALL_USERS, GET_USERNAME } from '../../utils/queries';
import { useMutation, useQuery} from '@apollo/client';
import UserList from '../userList/UserList';
import ProjectDropDown from '../dropdowns/ProjectDropDown';


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

    const [notification, setNotification] = useState(false);
    const [errorMsgToggle, setErrorMsgToggle] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [memberData, setMemberData] = useState();
    const [projectData, setProjectData] = useState(null);
    const [typeSelectedOption, setTypeSelectedOption] = useState(null);
    const [prioritySelectedOption, setPrioritySelectedOption] = useState(null);
    const [ticket, setTicket] = useState({
      submitter: user,
      title: '',
      description: ''
  })

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);


    const {loading, data, error: userError } = useQuery(ALL_USERS);
    const {loading: projectsLoading, data: projectsData, error: projectError} = useQuery(QUERY_PROJECTS);
    const [createTicket, {error} ] = useMutation(CREATE_TICKET);
    const [setTicketToProject, {error: ticketToProjectError}] = useMutation(ADD_TICKET_TO_PROJECT);


    if(projectsLoading) return <p>Loading...</p>
    if(!projectsData) return <p>No Projects Found</p>

    const projectList = projectsData?.allProjects || [];
  
    if (loading) return <p>Loading...</p>
    if (!data) return <p>No users Found</p>;
    const userList = data?.allUsers || [];
    
    const childToParent = (childdata) => {
      setMemberData(childdata);
    }

    const projectDropDownToModal = (childdata) => {
      setProjectData(childdata);
    }
  
    const handleChange = (event) => {
        const { name, value } = event.target;
        setTicket({
          ...ticket,
          [name]: value,
        });
    
      };

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


  
    const handleTicketFormSubmit = async (event) => {
        event.preventDefault();

        if (typeSelectedOption == null) {
          setErrorMsgToggle(true);
          setErrorMsg('Please Enter a Type of Ticket')
          return;
        }

        if (prioritySelectedOption == null) {
          setErrorMsgToggle(true);
          setErrorMsg('Please Enter a Priority of the Ticket')
          return;
        }

        const submitPriority = prioritySelectedOption.value
        const submitType = typeSelectedOption.value

  
 
        try {
            const { data } = await createTicket({
                variables: {
                   priority: submitPriority,
                    type: submitType,
                    assignTo: memberData,
                    ...ticket
                }
            
                
            })

          
            console.log(projectData.value)
          if (projectData.value !== 'null') {
            try {
              const { secondData } = await setTicketToProject({
                variables: {
                  projectId: projectData.value,
                  ticketId: data.createTicket._id
                }
              })
  
            } catch(e) {
              
              console.error(JSON.stringify(e, null, 2))
             
            }
          
          }
            

          setShowModal(false);
          setNotification(true);
           
        } 
        
        catch (e) {
            console.log("failed")
            console.error(JSON.stringify(e, null, 2))
            setErrorMsgToggle(true);
            setErrorMsg('Request was not sent! Please make sure Title, Description, and Type and a ticket to a project is entered.')

        }  
      
    }

    const label = "Assign Ticket To:"

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
            <TextField id="filled-basic" label="Title" name="title" value={ticket.title} variant="outlined" onChange={handleChange} size="small" sx={{my:1, width: '100%'}}/>
            <TextField  
            id="filled-basic" 
            name="description"
            label="Ticket Description"
            value={ticket.description} 
            onChange={handleChange} 
            variant="outlined"
            sx={{my:1, width: '100%'}}
            multiline
            minRows={3}
            maxRows={3} />
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

          <ProjectDropDown projectList={projectList} childToParent={projectDropDownToModal}/>

          <UserList usernameList={userList} childToParent={childToParent} label={label} />

            <Button type="submit" color="success" variant="contained" sx={{mt:2}}>Create Ticket</Button>
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
                 Ticket Created!
             </Alert>
            </Snackbar>   
  </div>
  )
}

export default TicketModal