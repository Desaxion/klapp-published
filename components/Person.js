import React from 'react'
import DeleteIcon from '../images/delete.svg'
import EditIcon from '../images/edit (1).svg'

function Person ({ person, onDelete, onEdit }) {
  return (
    <div className='PersonEntry'>
      {person.name}
      <img src={EditIcon} className='EditPerson' alt='edit' onClick={() => onEdit(person)} />
      <img src={DeleteIcon} className='PersonDelete' alt='delete' onClick={() => onDelete(person)} />
    </div>
  )
}

export default Person
