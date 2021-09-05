import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { EmergenciesList } from './EmergenciesList/EmergenciesList';
import { styles } from './EmergenciesScreen.styles';

export interface EmergenciesProps {}

type Props = NativeStackScreenProps<RootStackParamList, 'Emergencies'>;

export const EmergenciesScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.emergencies}>
      <Text style={styles.headingText}>What is your emergency?</Text>
      <EmergenciesList navigation={navigation}></EmergenciesList>
    </View>
  );
};
