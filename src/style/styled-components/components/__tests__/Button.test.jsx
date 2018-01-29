import React from 'react'
import { Button } from '../Button'
import { shallowWithTheme } from '../../../../testUtils'
import { theme } from '../../theme'
import 'jest-styled-components'

describe('<Button/>', () => {
  describe('Button default', () => {
    const wrapper = shallowWithTheme(<Button> Button </Button>, theme)
    it('renders without crashing', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('has default border color', () => {
      expect(wrapper).toHaveStyleRule('border', '1px solid #41474c')
    })
  })

  describe('Button with custom color', () => {
    const wrapper = shallowWithTheme(<Button palette={'primary'}>Button</Button>, theme)
    it('renders without crashing', () => {
      expect(wrapper).toMatchSnapshot()
    })
    it('has prop color', () => {
      expect(wrapper).toHaveStyleRule('color', theme.palette.primary[2])
    })
  })
})
