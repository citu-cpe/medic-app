import { StyleSheet, Platform, Dimensions } from 'react-native';
import { colors } from '../../utils/colors';

const win = Dimensions.get('window');

const isIOS = Platform.OS === 'ios';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 50,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: isIOS ? 40 : 15,
  },
  step: {
    marginBottom: 20,
  },
  stepName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 20,
  },
  stepDescription: {
    fontSize: 17,
    color: colors.white,
    lineHeight: 30,
    letterSpacing: 1,
  },
  stepImage: {
    borderRadius: 5,
    marginTop: 20,
    aspectRatio: 3 / 2,
    width: win.width,
    height: undefined,
  },
});
