import { useState } from 'react'
import Select from 'react-select';

const ProjectDropDown = ({projectList, childToParent}) => {

  const [projectSelected, setProjectSelected] = useState(null)
 
  const projectOptions = []


  projectList.map((project) => projectOptions.push({value: project._id, label: project.title}))

   childToParent(projectSelected);


  return (
    <>     <Select
    defaultValue={projectSelected}
     onChange={setProjectSelected}
     placeholder="Add Ticket To A Project"
     options={projectOptions}
     /></>
  )
}

export default ProjectDropDown