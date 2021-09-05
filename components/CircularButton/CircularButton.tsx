import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { getStyles } from './CircularButton.styles';

export interface CircularButtonProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: number;
  onPress?: () => any;
}

export function CircularButton(props: CircularButtonProps) {
  const styles = getStyles(props);

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.circularButton}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
}
