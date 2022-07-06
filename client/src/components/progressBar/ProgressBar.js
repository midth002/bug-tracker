import React from 'react'
import './progressBar.scss'

const ProgressBar = ({status}) => {
  return (
    <div>
        <ul className="bar-container">
            <li className={`${status == 'new' ? "active-bar bar" : "bar"}`}><p>New</p></li>
            <li className="bar"><p>Working</p></li>
            <li className="bar"><p>Needs Help</p></li>
            <li className="bar"><p>Resolved</p></li>
            <li className="bar"><p>Closed</p></li>
        </ul>
    </div>
  )
}

export default ProgressBar