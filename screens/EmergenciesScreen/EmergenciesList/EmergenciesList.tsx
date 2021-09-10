import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from '../../../App';
import { styles } from './EmergenciesList.styles';
import openMap from 'react-native-open-maps';
import { ScrollView, Box, Text } from 'native-base';
import { CircularButton } from '../../../components/CircularButton/CircularButton';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../utils/colors';
import { Step } from '../../FirstAidScreen/FirstAidScreen';
import { emergenciesList } from '../../../data/emergencies';

interface EmergenciesListProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Emergencies'>;
}

export interface EmergencyListItem {
  title: string;
  icon: string;
  steps: Step[];
}

export const EmergenciesList = ({ navigation }: EmergenciesListProps) => {
  const buttonSize = 40;

  const open = (destination: string) => {
    openMap({
      provider: 'google',
      navigate: true,
      end: destination,
    });
  };

  const firstAidButtons = emergenciesList.map((item) => (
    <CircularButton
      onPress={() =>
        navigation.navigate('FirstAid', {
          title: item.title,
          steps: item.steps,
        })
      }
      key={item.title}
    >
      <MaterialIcons
        // @ts-ignore
        name={item.icon}
        size={buttonSize}
        color={colors.red}
        style={styles.iconStyles}
      />
      <Text style={styles.buttonText}>{item.title}</Text>
    </CircularButton>
  ));

  return (
    <ScrollView
      style={styles.emergenciesList}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.buttonGroupText}>Get Directions</Text>
      <Box>
        <Box style={styles.buttonGroup}>
          <CircularButton onPress={() => open('Nearest Hospital')} dark={true}>
            <MaterialCommunityIcons
              name='hospital-building'
              size={buttonSize}
              color={colors.white}
              style={styles.iconStyles}
            />
            <Text style={{ ...styles.buttonText, color: colors.white }}>
              Hospital
            </Text>
          </CircularButton>
          <CircularButton
            onPress={() => open('Nearest Police Station')}
            dark={true}
          >
            <MaterialCommunityIcons
              name='police-badge'
              size={buttonSize}
              color={colors.white}
              style={styles.iconStyles}
            />
            <Text style={{ ...styles.buttonText, color: colors.white }}>
              Police Station
            </Text>
          </CircularButton>
        </Box>

        <Text style={styles.buttonGroupText}>First Aid Instructions</Text>
        <Box style={styles.buttonGroup}>{firstAidButtons}</Box>
      </Box>
    </ScrollView>
  );
};
