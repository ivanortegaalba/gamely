import styled from 'styled-components'
import { key, marginFromPropsMixing, palette, px2rems } from '../tools/functions'
import PropTypes from 'prop-types'
import { colors } from '../../styled-components/settings/colors'
import { spacing } from '../../styled-components/settings/spacing'

const radius = px2rems(2)

const padding = {
  s: `${px2rems(7)}`,
  m: `${px2rems(11)} ${px2rems(16)}`,
  l: `${px2rems(11)} ${px2rems(23)}`
}

const size = () => {
  return (props) => padding[props.size]
}

export const Button = styled.button`
  background-color: ${(props) => Boolean(props.reverse)
    ? key('palette.white')
    : palette(1)};
  border: 1px solid ${palette(1)};
  border-radius: ${radius};
  color: ${(props) => Boolean(props.reverse)
    ? palette(2)
    : key('palette.white') };
  cursor: pointer;
  font-variant: all-small-caps;
  font-weight: 600;
  padding: ${size};
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;

  &:hover {
  background-color: ${key('palette.white')};
  border-color:${palette(0)};
  color: ${palette(0)}};
  }

  &:active,
  &:focus {
    border-color: ${palette(2)};
  }

  &[disabled],
  &[disabled]:hover {
    background-color: ${key('palette.white')};
    border-color:${palette(2)};
    color: ${palette(2)};
    cursor: inherit;
  }
  
  ${marginFromPropsMixing}
`

Button.propTypes = {
  palette: PropTypes.oneOf(Object.keys(colors)),
  padding: PropTypes.oneOf(Object.keys(spacing)),
  margin: PropTypes.string,
  reverse: PropTypes.bool
}
Button.defaultProps = {
  palette: 'default',
  size: 'm',
  margin: '0',
  reverse: false
}
