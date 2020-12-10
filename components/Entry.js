import React, { useState, useEffect, useRef } from 'react'
import InputPresPop from './InputPresPop'
import { getPresents, addPresent, removePresent, getTotalCost, checkPresent } from '../lib/db'
import Present from './present'
import YesNoPopup from './YesNoPopup'
import PresentButton from './PresentButton'
import Sack from '../images/christmas-sack.svg'
import Arrow from './RotatingArrow'
import styled from 'styled-components'

const DropDown = styled.div`
transition: 200ms;
height: ${props => props.open ? props.targetHeight + 'px' : '0'};
overflow: hidden;
`
const Container = styled.div`
opacity: ${props => props.check ? '0.3' : '1'};
`

export function Entry ({ person, onCostChange }) {
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const [presents, setPresents] = useState(getPresents(person.id))
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [currentPresent, setCurrentPresent] = useState()
  const [popupEditIsOpen, setPopupEditIsOpen] = useState(false)
  const [visiblePresents, setVisiblePresents] = useState(false)
  const childrenElements = useRef(null)
  const [targetHeight, setTargetHeight] = useState(0)
  const allChecked = presents.filter(present => !present.checked).length === 0 && presents.length
  const handleAddPresent = (present) => {
    setPopupIsOpen(false)
    addPresent(present.name, present.cost, present.desc, person.id)

    onCostChange(getTotalCost())
    setPresents([...getPresents(person.id)])
  }

  const handleRemovePresent = () => {
    removePresent(currentPresent.id)
    setPresents(getPresents(person.id))
    setCurrentPresent()

    onCostChange(getTotalCost())
    setDeleteVisible(false)
  }

  const handleVisiblePresents = () => {
    setVisiblePresents(!visiblePresents)
  }

  const handleEditPresent = (present) => {
    setCurrentPresent(present)

    onCostChange(getTotalCost())
    setPopupEditIsOpen(true)
  }

  const editPresent = (input) => {
    currentPresent.name = input.name
    currentPresent.cost = input.cost
    currentPresent.desc = input.desc
    setPopupEditIsOpen(false)
  }

  const handleTrashClick = (present) => {
    setCurrentPresent(present)
    setDeleteVisible(true)
  }
  const onCheck = (present) => {
    checkPresent(!present.checked, present.id)
    setPresents(getPresents(person.id))
  }

  const PresentElements = presents.map(present => <Present present={present} key={present.id} onCheck={() => onCheck(present)} onDelete={handleTrashClick} onEdit={handleEditPresent} />)
  useEffect(() => {
    setTargetHeight(childrenElements.current.scrollHeight)
  }, [presents])
  return (
    <div className='EntryWrap'>
      <div className='Entry'>
        <YesNoPopup keyValue='DeleteThePresentPopup' visible={deleteVisible} onYes={handleRemovePresent} onClose={() => setDeleteVisible(false)}>Vill du verkligen ta bort {currentPresent && currentPresent.name}</YesNoPopup>
        <InputPresPop keyValue='InputPresent' visible={popupIsOpen} onClose={() => setPopupIsOpen(false)} onDone={(present) => handleAddPresent(present)} children={<p className='aText'>Lägg till en present åt {person.name}</p>} />
        <InputPresPop
          keyValue='InputEditPresent' visible={popupEditIsOpen} onClose={() => setPopupEditIsOpen(false)}
          iniName={currentPresent && currentPresent.name} iniCost={currentPresent && currentPresent.cost} iniDesc={currentPresent && currentPresent.desc} onDone={editPresent} children={<p className='aText'>Ändra {currentPresent}</p>}
        />
        <Container check={allChecked}>
          <div className='EntryHeader'>
            <Arrow value={visiblePresents} onClick={handleVisiblePresents} />
            <h2>{person.name}</h2>
            <div className='PresentAmount'>
              <img src={Sack} alt='Sack' className='Sack' />
              <p>{presents.length}</p>
            </div>
            <PresentButton klassNamn='AddPresent' onClick={() => setPopupIsOpen(true)} children={<p>+</p>} />
          </div>
        </Container>
      </div>
      <DropDown open={visiblePresents} targetHeight={targetHeight} className='Presents'>
        <div ref={childrenElements}>{PresentElements}</div>
      </DropDown>
    </div>
  )
}
