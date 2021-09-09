import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { RootStackParamList } from '../../App';
import { styles } from './HomeScreen.styles';
import { Box } from 'native-base';
import { CircularButton } from '../../components/CircularButton/CircularButton';

export interface HomeProps {}

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
  </Box>
);
