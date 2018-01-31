import styled from 'styled-components';
import { key, palette, px2rems } from '../tools/functions';

const inputRadius = '2px';
const inputPadding = px2rems(11);

export const Input = styled.input`
  width: 100%;
  border-radius: ${px2rems(inputRadius)};
  border: 1px solid ${palette(2)};
  background-color: ${key('palette.white')};
  padding: ${inputPadding};
  font-weight: 400;
  font-size: ${px2rems(13)};
  color: ${palette(2)};

  &::placeholder {
    color: ${palette(0)};
  }

  &:focus {
    border: 1px solid ${key('palette.blue.1')};
    outline: none;
  }

  &:active {
    border-color: ${key('palette.blue.1')};
    color: ${palette(2)};
  }

  &:disabled {
    border-color: ${key('palette.ligth.4')};
    color: ${key('palette.ligth.3')};
  }
  label {
    display: inline-block;
    margin-bottom: ${px2rems(7)};
  }
`;
