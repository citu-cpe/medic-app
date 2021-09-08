import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';
import { EmergenciesListItemProps } from './EmergenciesListItem';

export const getStyles = (props: EmergenciesListItemProps) => {
  return StyleSheet.create({
    emergenciesListItem: {
      height: 150,
      width: 150,
      margin: 20,
      padding: 20,
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
      elevation: 5,
    },
    text: {
      color: props.dark ? colors.white : colors.red,
      fontWeight: 'bold',
    },
  });
};
