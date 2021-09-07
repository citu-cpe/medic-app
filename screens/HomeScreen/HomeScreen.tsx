import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { RootStackParamList } from '../../App';
import { styles } from './HomeScreen.styles';

export interface HomeProps {}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => (
  <View style={styles.container}>
    <Button
      style={{ borderRadius: 100 }}
      colorScheme='red'
      h={200}
      w={200}
      _text={{ fontSize: 50, color: 'white' }}
      onPress={() => navigation.navigate('Emergencies', {})}
    >
      HELP!
    </Button>
    <StatusBar style='auto' hidden={true} />
  </View>
);
