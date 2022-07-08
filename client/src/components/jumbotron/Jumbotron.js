import React from 'react'
import './jumbotron.scss'

const Jumbotron = ({title, id}) => {
  return (
    <div className="jumbo">
        <h3>{title}</h3>
    </div>
  )
}

export default Jumbotron