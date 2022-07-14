import React from 'react'
import './jumbotron.scss'

const Jumbotron = ({title, id}) => {
  return (
    <div className="jumbo">
        <div className='jumbo-title'><h3>{title}</h3></div>
    </div>
  )
}

export default Jumbotron