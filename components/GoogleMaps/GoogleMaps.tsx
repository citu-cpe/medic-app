import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowBackIcon, Box, StatusBar } from 'native-base';
import { TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { RootStackParamList } from '../../App';
import { styles } from './GoogleMaps.styles';

export interface GoogleMapsScreenProps {}

type Props = NativeStackScreenProps<RootStackParamList, 'GoogleMaps'>;

export const GoogleMaps = ({ navigation }: Props) => {
  return (
    <Box style={styles.container}>
      <StatusBar hidden={true} />
      <MapView style={styles.map} />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ArrowBackIcon />
      </TouchableOpacity>
    </Box>
  );
};
