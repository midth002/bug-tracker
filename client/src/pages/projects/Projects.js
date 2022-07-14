import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import React from 'react';
import ProjectTable from '../../components/projectTable/ProjectTable';
import ProjectModal from '../../components/projectModal/ProjectModal';
import './projects.scss'

const Projects = () => {
  return (
    <>
      
    <Container className="container">
      
        <Box 
        className="projects"
        bgcolor="white"
        sx={{ 
          boxShadow: 3,
          borderRadius: 2, 
          width: '100%',
        }}
        >
            <div className="project-header">
            <h5>Projects</h5>
                    <div className='create-new-project-div'>
                        <ProjectModal />
                    </div>
                    
            </div>
        <ProjectTable />
        </Box>
    </Container>
    </>
  )
}

export default Projects