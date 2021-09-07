import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.beige,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: colors.red,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 50,
    color: colors.white,
  },
});
