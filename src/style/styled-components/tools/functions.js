import { css } from 'styled-components';
import { get } from 'lodash';

const px2rems = px => `${px / 16}rem`;
// TODO: Support custom margins, not only predefined spacing. i.e: margin: '20px 10rem'
const spacingFromProps = spacingProp => props => {
  const propValue = props[spacingProp];
  return (
    propValue &&
    String(get(props, spacingProp, []))
      .split(' ')
      .map(
        size =>
          parseInt(size, 10) === 0
            ? '0'
            : px2rems(get(props, ['theme', 'spacing', size]))
      )
      .join(' ')
  );
};

const marginFromPropsMixing = css`
  ${props =>
    props.hasOwnProperty('marginLeft') &&
    css`
      margin-left: ${spacingFromProps('marginLeft')};
    `}
  ${props =>
    props.hasOwnProperty('marginRight') &&
    css`
      margin-right: ${spacingFromProps('marginRight')};
    `}
  ${props =>
    props.hasOwnProperty('marginTop') &&
    css`
      margin-top: ${spacingFromProps('marginTop')};
    `}
  ${props =>
    props.hasOwnProperty('marginBottom') &&
    css`
      margin-bottom: ${spacingFromProps('marginBottom')};
    `}
  ${props =>
    props.hasOwnProperty('margin') &&
    css`
      margin: ${spacingFromProps('margin')};
    `}
  `;

const paddingFromPropsMixing = css`
  ${props =>
    props.hasOwnProperty('paddingLeft') &&
    css`
      padding-left: ${spacingFromProps('paddingLeft')};
    `}
  ${props =>
    props.hasOwnProperty('paddingRight') &&
    css`
      padding-right: ${spacingFromProps('paddingRight')};
    `}
  ${props =>
    props.hasOwnProperty('paddingTop') &&
    css`
      padding-top: ${spacingFromProps('paddingTop')};
    `}
  ${props =>
    props.hasOwnProperty('paddingBottom') &&
    css`
      padding-bottom: ${spacingFromProps('paddingBottom')};
    `}
  ${props =>
    props.hasOwnProperty('padding') &&
    css`
      padding: ${spacingFromProps('padding')};
    `}
  `;

export { prop } from 'styled-tools';
export { key, palette } from 'styled-theme';
export { px2rems, marginFromPropsMixing, paddingFromPropsMixing };
