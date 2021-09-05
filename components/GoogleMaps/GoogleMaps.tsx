import React from 'react';
import { View } from 'react-native';
import MapView from 'react-native-maps';
import { styles } from './GoogleMaps.styles';

export interface GoogleMapsProps {}

export const GoogleMaps = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
};
