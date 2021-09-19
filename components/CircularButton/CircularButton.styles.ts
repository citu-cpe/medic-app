import { StyleSheet, TouchableOpacityProps, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { CircularButtonProps } from './CircularButton';

const isAndroid = Platform.OS === 'android';

export const getStyles = (
  props: TouchableOpacityProps & CircularButtonProps
) => {
  return StyleSheet.create({
    button: {
      height: props.size || 150,
      width: props.size || 150,
      padding: 20,
      marginVertical: 20,
      marginHorizontal: isAndroid ? 4 : undefined,
      backgroundColor: props.dark ? colors.red : colors.white,
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
      elevation: props.dark ? 7 : 5,
    },
  });
};
