import styled from 'styled-components'
import { px2rems } from '../tools/functions'

const verticalPadding = px2rems(5)

export const FlexGrid = styled.div`
  padding: ${verticalPadding} 0;
  margin: 0;
  width: 100%;
  
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  justify-content: flex-start;
  
  ::-webkit-scrollbar {
    width: 20px;
}

/* Track */
::-webkit-scrollbar-track {
    background: ${props => props.theme.palette.light[2]}; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: ${props => props.theme.palette.dark[2]}; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.palette.dark[0]}; 
}
`

export const Grid = styled.div`
  margin: 0;
  width: 100%;
  
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-row-gap: ${px2rems(10)};
`
