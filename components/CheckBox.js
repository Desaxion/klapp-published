import React from 'react'
import noCheck from '../images/nocheck.svg'
import CheckIcon from '../images/check.svg'
import styled from 'styled-components'

const StyledImg = styled.img`
margin:10px;
`

function CheckBox ({ value, onClick }) {
  return (
    <StyledImg src={value ? CheckIcon : noCheck} className='CheckIcon' alt='Check' onClick={onClick} />
  )
}
export default CheckBox
