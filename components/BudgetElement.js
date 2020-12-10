import React from 'react'
import { getTotalCost } from '../lib/db'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: lightgray;
`

const BudgetText = styled.p`
  color: ${props => props.red ? 'red' : 'green'};
  margin: 5px 10px;
`

function BudgetElement ({ chosenBudget = 0, cost = getTotalCost() }) {
  return (
    <Container className='budgetField'>
      <BudgetText red={cost > chosenBudget}>Total Kostnad: {cost} </BudgetText>
      <BudgetText red={cost > chosenBudget}>Total budget: {chosenBudget} </BudgetText>
    </Container>
  )
}
export default BudgetElement
