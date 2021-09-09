import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from '../../../App';
import { styles } from './EmergenciesList.styles';
import openMap from 'react-native-open-maps';
import { ScrollView, Box, Text } from 'native-base';
import { CircularButton } from '../../../components/CircularButton/CircularButton';

interface EmergenciesListProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Emergencies'>;
}

interface EmergencyListItem {
  title: string;
  screen: string;
}

// TODO: use section list
export const EmergenciesList = (props: EmergenciesListProps) => {
  const emergenciesList: EmergencyListItem[] = [
    { title: 'COVID-19', screen: '' },
    { title: 'Open wound', screen: '' },
    { title: 'Nauseous', screen: '' },
  ];

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
      {item.title}
    </CircularButton>
  ));

  return (
    <ScrollView
      style={styles.emergenciesList}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.buttonGroupText}>Get directions</Text>
      <Box>
        <Box style={styles.buttonGroup}>
          <CircularButton onPress={() => open('Nearest Hospital')} dark={true}>
            Hospital
          </CircularButton>
          <CircularButton
            onPress={() => open('Nearest Police Station')}
            dark={true}
          >
            Police Station
          </CircularButton>
        </Box>

        <Text style={styles.buttonGroupText}>First Aid Instructions</Text>
        <Box style={styles.buttonGroup}>{firstAidButtons}</Box>
      </Box>
    </ScrollView>
  );
};
