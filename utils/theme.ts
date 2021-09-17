import { extendTheme } from 'native-base';
import { colors } from './colors';

export const theme = extendTheme({
  colors: {
    red: {
      500: colors.red,
    },
  },
});
