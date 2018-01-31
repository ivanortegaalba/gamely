import React from 'react';
import { Button } from '../Button';
import { shallowWithTheme } from '../../../../testUtils';
import { theme } from '../../theme';
import 'jest-styled-components';
import { px2rems } from '../../';

describe('<Button/>', () => {
  describe('Button default', () => {
    const wrapper = shallowWithTheme(<Button> Button </Button>, theme);
    it('renders without crashing', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('has default border color', () => {
      expect(wrapper).toHaveStyleRule(
        'background-color',
        theme.palette.default[1]
      );
    });
  });

  describe('Button with custom color', () => {
    const wrapper = shallowWithTheme(
      <Button palette={'primary'}>Button</Button>,
      theme
    );
    it('renders without crashing', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('has prop color', () => {
      expect(wrapper).toHaveStyleRule(
        'background-color',
        theme.palette.primary[1]
      );
    });
  });
  describe('Button with custom margin', () => {
    const component = (
      <Button
        margin={'m'}
        marginTop={'l'}
        marginBottom={'l'}
        marginLeft={'l'}
        marginRight={'l'}
      >
        Button
      </Button>
    );
    const wrapper = shallowWithTheme(component, theme);
    it('renders without crashing', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('has prop margin', () => {
      expect(wrapper).toHaveStyleRule('margin', px2rems(theme.spacing.m));
      expect(wrapper).toHaveStyleRule('margin-top', px2rems(theme.spacing.l));
      expect(wrapper).toHaveStyleRule('margin-left', px2rems(theme.spacing.l));
      expect(wrapper).toHaveStyleRule('margin-right', px2rems(theme.spacing.l));
      expect(wrapper).toHaveStyleRule(
        'margin-bottom',
        px2rems(theme.spacing.l)
      );
    });
  });
  describe('Button with custom size', () => {
    const component = <Button size={'l'}>Button</Button>;
    const wrapper = shallowWithTheme(component, theme);
    it('renders without crashing', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('has prop margin', () => {
      expect(wrapper).toHaveStyleRule('padding', '0.6875rem 1.4375rem');
    });
  });
});
