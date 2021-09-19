import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { getStyles } from './CircularButton.styles';

export interface CircularButtonProps {
  dark?: boolean;
  children?: any;
  size?: number;
}

export const CircularButton = ({
  children,
  ...props
}: TouchableOpacityProps & CircularButtonProps) => {
  const styles = getStyles(props);

  return (
    <TouchableOpacity {...props} style={{ ...styles.button }}>
      {children}
    </TouchableOpacity>
  );
};
