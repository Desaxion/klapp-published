import React, { useState } from 'react'
import Popup from 'react-animated-popup'
import Button from './Button'
import InputPopup from './InputPresPop'
// import PopUp from './PopUp';

function handleInput (event) {

  /* setText(event.target.value) */
}

// class Budget extends React.Component {
//   render () {
//     return (
//       <header>
//         <form id='to-do-form'>
//           <input type='text' placeholder='Skriv budget...' />
//           <button type='submit'>BEKRÄFTA</button> <button type='submit'>AVBRYT</button>
//         </form>

//       </header>

//     )
//   }
// }
function handleOK (event) {
  event.preventDefault()
}
function handleNotOK (event) {
  event.preventDefault()
}
function Budget ({ visible, onClose }) {
  return (
    <div className='popupContainer'>
      <Popup key='Budgetpop' className='BudgetPopup' visible={visible} onClose={onClose}>
        <form id='budget-list'>
          <div className='Budgett'>
            <input type='text' placeholder='Skriv Total Budget...' onChange={handleInput} />
            <Button type='submit' onDone={handleOK} style={{ backgroundColor: 'green' }}> BEKRÄFTA </Button>
            <Button type='submit' onSubmit={handleNotOK}> AVBRYT </Button>
          </div>
        </form>
      </Popup>
    </div>


  )
}

export default Budget
