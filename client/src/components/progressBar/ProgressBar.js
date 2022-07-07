import React, {useState} from 'react'
import './progressBar.scss';
import { UPDATE_STATUS } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const ProgressBar = ({status, ticketId}) => {

  const [updateTicketStatus, {error} ] = useMutation(UPDATE_STATUS);
  const [updateStatus, setUpdateStatus] = useState({
      id: ticketId,
  })

  console.log(updateStatus);

  const changeTicketStatus = async (event) => {
    event.preventDefault();
    const currentStatus  = event.target.id;
    console.log(currentStatus);
    try {
      const { data } = await updateTicketStatus({
          variables: {
            status: currentStatus,
            ...updateStatus
          }
      })

      console.log(data);
    } catch (e) {
      console.log("failed")
      console.error(JSON.stringify(e, null, 2))
  }
  }

    

  return (
    <div>
        <ul className="bar-container">
            <li className="active-bar bar" id="New" onClick={changeTicketStatus} value="New">New</li>
            <li className={`${status == 'Working' ? "active-bar bar" : "bar"}`} id="Working" onClick={changeTicketStatus} value="Working">Working</li>
            <li className="bar" id="Needs_Help"><p>Needs Help</p></li>
            <li className="bar" id="Resolved"><p>Resolved</p></li>
            <li className="bar" id="Closed"><p>Closed</p></li>
        </ul>
    </div>
  )
}

export default ProgressBar