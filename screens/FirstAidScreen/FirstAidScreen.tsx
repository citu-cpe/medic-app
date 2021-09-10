import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, Text, Box, Image } from 'native-base';
import React from 'react';
import { StatusBar } from 'react-native';
import { RootStackParamList } from '../../App';
import { styles } from './FirstAidScreen.style';

export interface FirstAidScreenProps {
  title: string;
  steps: Step[];
}

export interface Step {
  stepName: string;
  stepDescription: string;
  stepImageUrl?: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'FirstAid'>;

export const FirstAidScreen = ({ route }: Props) => {
  const steps = route.params.steps.map((step, i) => (
    <Box style={styles.step} key={step.stepName + i}>
      <Text style={styles.stepName}>{step.stepName}</Text>
      <Text style={styles.stepDescription}>{step.stepDescription}</Text>
      <Image
        source={{ uri: step.stepImageUrl }}
        alt={step.stepName}
        size={'xl'}
        style={styles.stepImage}
      />
    </Box>
  ));

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle='light-content' />
      <Text style={styles.heading}>{route.params.title}</Text>
      {steps}
    </ScrollView>
  );
};
