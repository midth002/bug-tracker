import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

import ProgressBar from '../../components/progressBar/ProgressBar';
import ProjectForm from '../../components/projectForm/ProjectForm';
import Loading from '../../components/loading/Loading';
import CommentForm from '../../components/commentForm/CommentForm'
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ONE_PROJECT } from '../../utils/queries';
import './singleProjects.scss';
import Comments from '../../components/comments/Comments';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import { Box } from '@mui/material';
import AddMember from '../../components/addMembers/AddMember';

const SingleProject = () => {

    const params = window.location.href;
    const paramArray = params.split('/');
    const projectNum = paramArray[5]


        const { loading: projectLoading, data: projectData, error } = useQuery(QUERY_ONE_PROJECT, {
            variables: {
                projectId: projectNum}
        })

        if (projectLoading) return <Loading />;
        if (!projectData) return <p>Not Found</p>;

      const getProjectInformation = async () => {
        console.log(projectData.getOneProject.members)
      }

    // getProjectInformation();

    const title = projectData.getOneProject.title

    return (
        <div className="container">

        <Sidebar />
        <Jumbotron title={title}/>
        <Box 
        className="ticket" 
        sx={{ display: 'flex', 
        flexGrow: 1, 
        flexwrap: 'wrap'}}

        >
                <div className='ticketForm'>
                    <ProjectForm
                    description={ projectData.getOneProject.description} 
                    type={projectData.getOneProject.type}
                    projectId={projectData.getOneProject._id}
                    />
                </div>
                
            </Box>
            <AddMember member={projectData.getOneProject.members}/>
        </div>
      )
}

export default SingleProject;