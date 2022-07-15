import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {Box} from '@mui/material';
import './goBack.scss';

const GoBack = () => {
  return (
    <Box
    className="go-back"
    sx={{
        position: 'fixed',
         ml:150, 
         width: '40%',
         display: 'block'
         }}
    ><p>Go Back</p>
    <span>
    <FontAwesomeIcon icon={faCircleArrowLeft} className="go-back-icon" />
    </span>
    </Box>
  )
}

export default GoBack