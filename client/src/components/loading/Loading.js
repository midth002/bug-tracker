import React from 'react';

import Sidebar from '../sidebar/Sidebar';
import Jumbotron from '../jumbotron/Jumbotron'

const Loading = () => {
  const title = "Loading ..."
  return (
    <div>
      <Sidebar />
      <Jumbotron title={title}/>
        <div>
          
        </div>
    </div>
    
  )
}

export default Loading