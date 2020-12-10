import React from 'react'
import arrow from '../images/arrow.svg'
import styled from 'styled-components'

const ArrowImg = styled.img`
transform: ${props => props.rotated ? 'rotate(90deg)' : 'rotate(0deg)'};
  transition:200ms;

`

function CheckBox ({ value, onClick }) {
  return (
    <ArrowImg src={arrow} className='arrow' alt='Check' onClick={onClick} rotated={value} />
  )
}
export default CheckBox
