import React, { useState } from 'react'
import { getPeople, addPerson, removePerson, getTotalCost } from '../lib/db'
import addImage from '../images/add (1).svg'
import Person from '../components/Person'
import InputPopup from '../components/InputPopup'
import YesNoPopup from './YesNoPopup'
// import Popup from 'react-animated-popup'

// Formulera en datastruktur som liknar den som är i countries som vi haft i labben.

// Show present false? När är den true?
function Persons ({ onCostChange }) {
  const [people, setPeople] = useState(getPeople())
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false)
  const [currentPerson, setCurrentPerson] = useState()
  const [deletePersonVisible, setDeletePersonVisible] = useState(false)

  // asynkron?
  const deletePerson = () => {
    removePerson(currentPerson.id)
    setCurrentPerson()
    setPeople([...getPeople()])
    setDeletePersonVisible(false)
    onCostChange(getTotalCost())
  }

  const handleDeleteClick = (person) => {
    setCurrentPerson(person)
    setDeletePersonVisible(true)
  }

  const handleEditRequest = (person) => {
    setCurrentPerson(person)
    setEditPopupIsOpen(true)
  }

  var PeopleElements = people.map(person => <Person person={person} key={person.id} onDelete={handleDeleteClick} onEdit={handleEditRequest} />)

  const editPerson = (inputName) => {
    currentPerson.name = inputName
    setEditPopupIsOpen(false)
  }

  const handleAddPerson = (name) => {
    setPopupIsOpen(false)
    addPerson(name)
    setPeople([...getPeople()])
  }

  /* const deleteAll = () => {
    flushDB()
    // det är att react tror att det är samma object för att den har gamla addressen så vi måste skapa en ny kopia
    setPeople([...getPeople()]) // Vad betyder ...? Shallow copy
  } */

  return (
    <div>
      <div className='EntryElements'>
        <h2>{PeopleElements}</h2>
      </div>
      <YesNoPopup keyValue='DeleteThePersonPopup' visible={deletePersonVisible} onYes={deletePerson} onClose={() => setDeletePersonVisible(false)}>Vill du verkligen ta bort {currentPerson && currentPerson.name}? </YesNoPopup>

      <InputPopup key='personPopup' visible={popupIsOpen} onClose={() => setPopupIsOpen(false)} onDone={handleAddPerson} children={<p className='aText'>Lägg till en person</p>} />

      <InputPopup
        key='personEditPopup'
        visible={editPopupIsOpen}
        onClose={() => setEditPopupIsOpen(false)}
        onDone={editPerson}
        // Fieldstring funkar inte
        initialState={currentPerson && currentPerson.name}
        children={<p className='aText'>Ändra {currentPerson && currentPerson.name} </p>}
      />

      <div className='center'><img src={addImage} alt='add' onClick={() => setPopupIsOpen(true)} className='addImg' /></div>
      {/* <button onClick={deleteAll}> <img height={30} src={DeleteIcon} alt='delete' /></button> */}
    </div>
  )
}
export default Persons
