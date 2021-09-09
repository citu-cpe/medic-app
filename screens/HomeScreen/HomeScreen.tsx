import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { RootStackParamList } from '../../App';
import { styles } from './HomeScreen.styles';

export interface HomeProps {}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => (
  <SafeAreaView style={styles.container}>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Emergencies', {})}
    >
      <Text style={styles.buttonText}>HELP!</Text>
    </TouchableOpacity>
  </SafeAreaView>
);
