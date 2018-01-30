import styled from 'styled-components'
import { key, palette, px2rems } from '../tools/functions'

const headerHeight = px2rems(60)

export const Header = styled.header`
  background-color: ${palette(1)};
  height: ${headerHeight};
  color: ${key('palette.white')};
  display: flex;
  align-items: center;
  justify-content: center;
`
Header.defaultProps = {
  palette: 'default'
}
