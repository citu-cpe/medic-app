import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './EmergenciesListItem.style';

export interface EmergencyListItem {
  title: string;
  screen: string;
}

interface EmergenciesListItemProps {
  emergencyListItem: EmergencyListItem;
  navigate: (screen: string, params: any) => void;
}

export const EmergenciesListItem = (props: EmergenciesListItemProps) => {
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
