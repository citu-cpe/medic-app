import { StyleSheet } from 'react-native';
import { CircularButtonProps } from './CircularButton';

export const getStyles = (props: CircularButtonProps) =>
  StyleSheet.create({
    circularButton: {
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderRadius: 100,
      backgroundColor: props.backgroundColor || 'red',
    },
    text: {
      fontSize: props.fontSize || 20,
      fontWeight: 'bold',
      color: props.textColor || 'white',
    },
  });
