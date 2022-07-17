import {useState} from 'react'
import { Alert, Snackbar, Button} from '@mui/material'

const Notification = () => {

    const [notification, setNotification] = useState(false)

    const handleAlertOpen = () => {
        setNotification(true)
    }

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
       
      };

  return (
    <>
            <Snackbar open={notification} autoHideDuration={6000} onClose={handleAlertClose}>
             <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                 Project Created!
             </Alert>
            </Snackbar>     
  </>
  )
}

export default Notification