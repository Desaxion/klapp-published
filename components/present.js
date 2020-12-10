import React from 'react'
import DeleteIcon from '../images/delete.svg'
import EditIcon from '../images/edit (1).svg'
import CheckBox from './CheckBox'
import styled from 'styled-components'

const OpaDiv = styled.div`
opacity : ${props => props.check ? '0.5' : '1'};
background-color: #dbdbdb;
border-radius: 25px;
border-style: ridge;
border-radius: 25px;
margin:4px;
`
const RowDiv = styled.div`
display: flex;
flex-direction: row;
`
const StyledImg = styled.img`
margin:10px;

`

const EntryDiv = styled.div`
display: flex;
flex-direction: column;
align-items:center;
justify-content: center;
margin:3px;
`
const BodyDiv = styled.div`
display:flex:
flex-direction: column;
padding: 10px;
`
const TextDiv = styled.div`
display: flex;
align-items: center;
`
const StyledH = styled.h4`
margin-right:4px;
`

function Present ({ present, onDelete, onEdit, onCheck }) {
  return (
    <div className='PresentEntryWrap'>
      <OpaDiv className='PresentEntry' check={present.checked}>
        <EntryDiv>

          <h3>{present.name}</h3>
          <BodyDiv>
            <RowDiv>
              <TextDiv>
                <StyledH>Pris:</StyledH><p>{present.cost}</p>
              </TextDiv>
              <StyledImg src={EditIcon} className='EditPerson' alt='edit' onClick={() => onEdit(present)} />
              <StyledImg src={DeleteIcon} className='PersonDelete' alt='delete' onClick={() => onDelete(present)} />
              <CheckBox value={present.checked} onClick={onCheck} />
            </RowDiv>
            <p>Beskrivning:</p>{present.desc}
          </BodyDiv>
        </EntryDiv>

      </OpaDiv>

    </div>
  )
}

export default Present
