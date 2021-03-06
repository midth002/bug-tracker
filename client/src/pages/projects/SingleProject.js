import React, { useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'

import GoBack from '../../components/goBack/GoBack';
import ProgressBar from '../../components/progressBar/ProgressBar';
import ProjectForm from '../../components/projectForm/ProjectForm';
import Loading from '../../components/loading/Loading';
import CommentForm from '../../components/commentForm/CommentForm'
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ONE_PROJECT, GET_USERNAME } from '../../utils/queries';
import './singleProjects.scss';
import Comments from '../../components/comments/Comments';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import { Box, Grid} from '@mui/material';
import AddMember from '../../components/addMembers/AddMember';
import AllTicketTable from '../../components/ticketTable/AllTicketTable';
import Auth from '../../utils/auth'

const SingleProject = () => {

    const params = window.location.href;
    const paramArray = params.split('/');
    const projectNum = paramArray[4]
  

    const username = Auth.getUsername();
    
    const {loading: userLoading, data: userData, error: userError} = useQuery(GET_USERNAME, {
      variables: {
        username: username
      }
    });

    const { loading: projectLoading, data: projectData, error } = useQuery(QUERY_ONE_PROJECT, {
        variables: {
            projectId: projectNum}
    });

    if(userLoading) return <Loading />

    const user = userData.getOneUserByUsername[0]._id

      

        if (projectLoading) return <Loading />;
        if (!projectData) return <p>Not Found</p>;



    const title = projectData.getOneProject.title
    
    return (
        <div className="container">

        <Sidebar />
        <Jumbotron title={title}/>
        <Grid container spacing={1}
        className="ticket" 
        sx={{ml: 14,
            mt: 7
        }}
        >
      
               <Grid item xs={5} sx={{
              
               }}>
              
               
                    <ProjectForm
                    project={projectData.getOneProject}
                    />
                    
              </Grid>

              <Grid item xs={0.25} >
              </Grid>
              
              <Grid item xs={5} 
           ><AddMember member={projectData.getOneProject.members} projectId={projectData.getOneProject._id}/></Grid>
          
                
               <Grid item xs={10}>
               <AllTicketTable ticket={projectData.getOneProject.ticketId} user={user} />
               </Grid> 

              
              
            </Grid>
            
        </div>
      )
}

export default SingleProject;