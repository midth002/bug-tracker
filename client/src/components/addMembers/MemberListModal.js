import { useState } from 'react'
import { Modal, Box, Button, Typography } from '@mui/material';
import { ADD_MEMBER_TO_PROJECT } from '../../utils/mutations';
import { ALL_USERS } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import UserList from '../userList/UserList';


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

const MemberListModal = 
({projectId}) => {




    const [showModal, setShowModal] = useState(false);
    const [memberData, setMemberData] = useState();

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const [addMemberToProject, {error} ] = useMutation(ADD_MEMBER_TO_PROJECT);

    const {loading, data, error: userError } = useQuery(ALL_USERS);
    if (loading) return <p>Loading...</p>
    if (!data) return <p>No users Found</p>;

    const userList = data?.allUsers || [];

    const childToParent = (childdata) => {
      setMemberData(childdata);
    }


  const handleNewMembersToProject = async () => {
        try {
          const { data } = await addMemberToProject({
              variables: {
                projectId: projectId,
                members: memberData,
              }
          })

          console.log("Added Members", data)
        } catch (err) {
          console.error(JSON.stringify(err, null, 2))
        }
  }


  return (
    <Box>
        <div>
        <Button 
        onClick={handleOpen} 
        style={{
            maxWidth: '200px', 
            maxHeight: '30px', 
            minWidth: '30px', 
            minHeight: '30px', 
            fontSize: '12px'}}>
            Add Member
            </Button>
        </div>
        <Modal 
        open={showModal}
        onClose={handleClose}
        >
        <Box sx={style}>
            <Typography 
            id="modal-modal-title" 
            variant="h6" 
            component="h2"
            >
              Add a Member To the Project
            </Typography>

            <UserList 
            usernameList={userList} 
            childToParent={childToParent}
            />

            <Button 
            onClick={handleNewMembersToProject}
            color="success"  
            variant="contained" 
            sx={{mt:2}}
            >Add Member
            </Button>
          </Box>
        </Modal>
    </Box>
  )
}

export default MemberListModal