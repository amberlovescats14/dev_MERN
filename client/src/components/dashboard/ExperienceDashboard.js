import React, { Fragment } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'


const ExperienceDashboard = props => {
  const { experience, deleteExperience } = props

  const experiences = experience.map(exp => (
    <tr key={exp._id}>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> 
      </td>
      <td>
        <button className="btn btn-danger"
        onClick={()=> deleteExperience(exp._id)}>Delete</button>
      </td>
    </tr>
  ))

  return (
    <div >
      <h2 className="my-2 text-dark">Experience Credentials</h2>
      <table className="table">
      <thead>
        <tr>
          <th className="text-dark">Race</th>
          <th className="hide-sm text-dark">Date</th>
          <th className="hide-sm"></th>
        </tr>
      </thead>
      <tbody className="tableBody">{experiences}</tbody>
      </table>
    </div>
  )
}

ExperienceDashboard.propTypes = {
  experience : PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
}

export default ExperienceDashboard
