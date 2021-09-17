import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import React from 'react';
import { styles } from './HomeScreen.styles';
import { Box } from 'native-base';
import { CircularButton } from '../../components/CircularButton/CircularButton';
import { RootStackParamList } from '../screens';
import { StaggerButtons } from '../../components/StaggerButtons/StaggerButtons';

export interface HomeScreenProps {}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => (
  <Box style={styles.container}>
    <CircularButton
      size={200}
      style={styles.button}
      dark={true}
      onPress={() => navigation.navigate('Emergencies', {})}
    >
      <Text style={styles.buttonText}>HELP!</Text>
    </CircularButton>
    <StaggerButtons />
  </Box>
);
