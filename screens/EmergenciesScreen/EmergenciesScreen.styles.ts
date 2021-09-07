import { StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

export const styles = StyleSheet.create({
  emergencies: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.beige,
  },
  headingText: {
    color: colors.black,
    padding: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
