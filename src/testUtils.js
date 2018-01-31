import 'jest-styled-components';
import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';

export const shallowWithTheme = (component, theme) => {
  const context = shallow(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext();
  return shallow(component, { context });
};

export const mountWithTheme = (component, theme) => {
  const context = mount(<ThemeProvider theme={theme} />)
    .instance()
    .getChildContext();
  return mount(component, { context });
};

export const shallowWithStore = (component, store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};
