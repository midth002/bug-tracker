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
            <li className={`${status === 'Working' || status == 'Needs_Help' || status == 'Resolved' || status == 'Closed' ? "active-bar bar" : "bar"}`} id="Working" onClick={changeTicketStatus} value="Working">Working</li>
            <li className={`${status == 'Needs_Help' || status == 'Resolved' || status == 'Closed' ? "active-bar bar" : "bar"}`} id="Needs_Help" onClick={changeTicketStatus}>Needs Help</li>
            <li className={`${status == 'Resolved' || status == 'Closed' ? "active-bar bar" : "bar"}`} id="Resolved" onClick={changeTicketStatus}>Resolved</li>
            <li className={`${status == 'Closed' ? "active-bar bar" : "bar"}`} id="Closed" onClick={changeTicketStatus}>Closed</li>
        </ul>
    </div>
  )
}

export default ProgressBar