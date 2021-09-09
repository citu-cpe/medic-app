import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from '../../../App';
import { styles } from './EmergenciesList.styles';
import openMap from 'react-native-open-maps';
import { ScrollView, Box, Text } from 'native-base';
import { CircularButton } from '../../../components/CircularButton/CircularButton';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../utils/colors';

interface EmergenciesListProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Emergencies'>;
}

interface EmergencyListItem {
  title: string;
  screen: string;
  icon: string;
}

export const EmergenciesList = (props: EmergenciesListProps) => {
  const emergenciesList: EmergencyListItem[] = [
    { title: 'COVID-19', screen: '', icon: 'coronavirus' },
    { title: 'Open wound', screen: '', icon: 'opacity' },
    { title: 'Nauseous', screen: '', icon: 'sick' },
  ];
  const buttonSize = 40;

  const handleNavigation = (screen: any, params: any) => {
    props.navigation.navigate(screen, params);
  };

  const open = (destination: string) => {
    openMap({
      provider: 'google',
      navigate: true,
      end: destination,
    });
  };

  const firstAidButtons = emergenciesList.map((item) => (
    <CircularButton
      onPress={() => handleNavigation('Emergencies', {})}
      key={item.title}
    >
      <MaterialIcons
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
