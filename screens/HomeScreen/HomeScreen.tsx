import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import { RootStackParamList } from '../../App';
import { CircularButton } from '../../components/CircularButton/CircularButton';
import { styles } from './HomeScreen.styles';

export interface HomeProps {}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <CircularButton
      text='HELP!'
      fontSize={40}
      onPress={() => navigation.navigate('Emergencies', {})}
    />
    <StatusBar style='auto' hidden={true} />
  </View>
);
