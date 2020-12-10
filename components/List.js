import React from 'react'
import { getPeople } from '../lib/db'
import { Entry } from './Entry'
import styled from 'styled-components'

const FadeDiv = styled.div`
opacity: ${props => props.fade ? '0.5' : '1'};
`

function list ({ onCostChange }) {
  const people = getPeople()
  var listElements
  var faded = false
  if (people.length === 0) {
    faded = true
    listElements = 'För att lägga till personer i listan, klicka på personikonen till höger.'
  } else {
    faded = false
    listElements = people.map(person => <Entry person={person} key={person.id} onCostChange={onCostChange} />)
  }

  return (<FadeDiv fade={faded}>{listElements}</FadeDiv>)
}
export default list
