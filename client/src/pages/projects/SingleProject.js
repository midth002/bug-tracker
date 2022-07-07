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
        console.log(projectData.getOneProject)
      }

    getProjectInformation();


    return (
        <div className="container">
        <div className='navbar'>
            <Navbar />
        </div>
        <Sidebar />
        <div className="ticket">
            <div className="ticket-header">
                <h4>Project # {projectData.getOneProject._id}</h4>
            </div>
                <div className='stepper'>
                    {/* <ProgressBar 
                    status={projectData.getOneProject.status}
                    projectId={projectData.getOneProject._id}
                    /> */}
                </div>
                <div className='ticketForm'>
                    <ProjectForm
                    description={ projectData.getOneProject.description} 
                    type={projectData.getOneProject.type}
                    projectId={projectData.getOneProject._id}
                    title={projectData.getOneProject.title}
                    />
                </div>
                <div className='comment-section'>
                <CommentForm />
                </div>
            </div>
        
        </div>
      )
}

export default SingleProject;