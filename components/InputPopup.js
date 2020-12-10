import React, { useState, useMemo } from 'react'
import Popup from 'react-animated-popup'
import Button from './Button'
import stringIsNumeric from 'string-is-numeric'
import Spacer from './Spacer'

function InputPopup ({ initialState = '', children, visible, onClose, onDone, numerical = false }) {
  const [string, setString] = useState(initialState)
  const handleInputChange = (e) => {
    if (numerical) { // vill de ha numeriskt?
      if (stringIsNumeric(e.target.value)) { // är det numeriskt?
        setString(e.target.value)
      } else { setString(string) }
    } else {
      setString(e.target.value)
    }
  }

  useMemo(() => {
    setString(initialState)
  }, [initialState])

  const handleDone = () => {
    onDone(string)
    setString('')
  }

  return (
    <div className='popupContainer'>
      <Popup className='PersonPopup' key='PersonPopup' visible={visible} onClose={onClose}>
        {children}
        <input value={string} onChange={handleInputChange} />
        <Spacer />
        <Button enabled={!!string} onClick={() => handleDone()}>BEKRÄFTA</Button>
        <Spacer />
        <Button onClick={onClose}>AVBRYT</Button>
      </Popup>
    </div>
  )
}

export default InputPopup
