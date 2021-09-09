import { StyleSheet, Platform } from 'react-native';
import { colors } from '../../../utils/colors';

const isIOS = Platform.OS === 'ios';

export const styles = StyleSheet.create({
  emergenciesList: {
    flex: 1,
    paddingHorizontal: 35,
    paddingTop: isIOS ? 40 : 30,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  buttonGroupText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: colors.red,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  buttonTextWhite: {
    color: colors.white,
  },
  buttonTextRed: {
    color: colors.red,
  },
  iconStyles: {
    marginBottom: 10,
  },
});
