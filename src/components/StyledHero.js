import styled from 'styled-components'
import defaultIMG from '../images/room-1.jpeg'

const StyledHero = styled.header`
min-height: 60vh;
  background: url(${props=> props.img || defaultIMG}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  `

export default StyledHero;