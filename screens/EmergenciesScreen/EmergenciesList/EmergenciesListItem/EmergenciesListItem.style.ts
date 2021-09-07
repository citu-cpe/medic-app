import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';

export const styles = StyleSheet.create({
  emergenciesListItem: {
    height: 150,
    width: 150,
    margin: 20,
    backgroundColor: colors.red,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.45,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
