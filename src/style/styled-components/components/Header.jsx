import styled from 'styled-components'
import { px2rems, palette, key } from '../tools/functions'

const headerHeight = px2rems(60)

export const Header = styled.header`
  background-color: ${palette(1)};
  flex: ${(props)=>{props.theme}}
  height: ${headerHeight};
  color: ${key('palette.white')};
  display: flex;
  align-items: center;
  justify-content: center;
`
Header.defaultProps = {
  palette: 'default'
}
