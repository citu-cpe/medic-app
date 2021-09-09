import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Text } from 'native-base';
import { RootStackParamList } from '../../App';
import { EmergenciesList } from './EmergenciesList/EmergenciesList';
import { styles } from './EmergenciesScreen.styles';

export interface EmergenciesProps {}

type Props = NativeStackScreenProps<RootStackParamList, 'Emergencies'>;

export const EmergenciesScreen = ({ navigation }: Props) => {
  return (
    <Box style={styles.emergencies}>
      <EmergenciesList navigation={navigation}></EmergenciesList>
    </Box>
  );
};
