import { colors } from './settings/colors';
import { fonts } from './settings/fonts';
import { spacing } from './settings/spacing';
import { fontSizes } from './settings/fontSizes';

export const theme = {
  fonts: { ...fonts },
  palette: { ...colors },
  spacing: { ...spacing },
  fontSizes: { ...fontSizes },
};
