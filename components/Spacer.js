import React from 'react'
import styled from 'styled-components'

const SpacerElement = styled.div`
  height: ${props => props.height};
  width: ${props => props.width};
`
function Spacer ({ height = '10px', width = '10px' }) {
  return (
    <SpacerElement height={height} width={width} />
  )
}

export default Spacer
