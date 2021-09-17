import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box } from 'native-base';
import { EmergenciesList } from './EmergenciesList/EmergenciesList';
import { styles } from './EmergenciesScreen.styles';
import { RootStackParamList } from '../screens';

export interface EmergenciesScreenProps {}

type Props = NativeStackScreenProps<RootStackParamList, 'Emergencies'>;

export const EmergenciesScreen = ({ navigation }: Props) => {
  return (
    <Box style={styles.emergencies}>
      <EmergenciesList navigation={navigation}></EmergenciesList>
    </Box>
  );
};
