import { useState, useEffect} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {Box} from '@mui/material'
import { useQuery } from '@apollo/client';
import { ALL_USERS } from '../../utils/queries';


const UserList = ({usernameList, childToParent, label}) => {

    const [checkedUsers, setCheckedUsers] = useState([]);

    
    const handleChange = (event) => {
        const newChecked = [...checkedUsers]
        const newUser = event.target.value; 
        const currentIndex = checkedUsers.indexOf(newUser);
        if (event.target.checked) {
            console.log(`The user,  is checked`);
           
            newChecked.push({_id: newUser})
            
        } else {
            console.log('Checkbox is unchecked')
            newChecked.splice(currentIndex, 1);
        }
        
        setCheckedUsers(newChecked);
    
    }

    childToParent(checkedUsers);

   
    
  



  return (
    <Box
        sx={{mt: 2}}
    >
        <label>{label}</label>
        <List 
        sx={{
            position: 'relative',
        overflow: 'auto',
        maxHeight: 75,
        '& ul': { padding: 0 },
        }}
        >
        {usernameList.map((user) => 
            <ListItem
            key={user._id}
            secondaryAction = {
                <Checkbox 
                edge="end"
                value={user._id}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
                />
            }
            sx={{
                padding: 0,
                margin: 0
            
            }}
            >
                
                <ListItemButton
                    sx={{
                        p: 0,
                        pl: 2,
                        pr: 2,
                    }}
                >
                    <ListItemText sx={{fontSize:'0.3em'}} primary={user.username} />
                  
                </ListItemButton>
                
            </ListItem>
        )}
        </List>
    </Box>
  )
}

export default UserList