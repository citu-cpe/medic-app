import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { getStyles } from './EmergenciesListItem.style';

export interface EmergencyListItem {
  title: string;
  screen: string;
}

export interface EmergenciesListItemProps {
  emergencyListItem: EmergencyListItem;
  navigate: (screen: string, params: any) => void;
  dark?: boolean;
}

export const EmergenciesListItem = (props: EmergenciesListItemProps) => {
  const styles = getStyles(props);

  return (
    <TouchableOpacity
      onPress={
        props.emergencyListItem.screen
          ? () => props.navigate(props.emergencyListItem.screen, {})
          : undefined
      }
      style={styles.emergenciesListItem}
    >
      <Text style={styles.text}>{props.emergencyListItem.title}</Text>
    </TouchableOpacity>
  );
};
