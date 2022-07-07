import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

import React from 'react';
import ProjectTable from '../../components/projectTable/ProjectTable';
import ProjectModal from '../../components/projectModal/ProjectModal';
import './projects.scss'

const Projects = () => {
  return (
    <div className="container">
        <div className='navbar'>
            <Navbar />
        </div>
        <Sidebar />
        <div className="projects">
            <div className="project-header">
            <h4>Projects</h4>
                    <div className='create-new-project-div'>
                        <ProjectModal />
                    </div>
                    
            </div>
        <ProjectTable />
        </div>
    </div>
  )
}

export default Projects