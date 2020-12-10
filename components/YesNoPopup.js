import React from 'react'
import Popup from 'react-animated-popup'
import Button from './Button'
import Spacer from './Spacer'

function YesNoPopup ({ keyValue, children, visible, onClose, onYes }) {
  return (
    <div className='popupContainer'>
      <Popup className='PersonPopup' key={keyValue} visible={visible} onClose={onClose}>
        {children}
        <Spacer />
        <Button onClick={onYes}>BEKRÄFTA</Button>
        <Spacer />
        <Button onClick={onClose}>AVBRYT</Button>
      </Popup>
    </div>
  )
}

export default YesNoPopup
