import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, View } from 'react-native';
import { RootStackParamList } from '../../../App';
import { styles } from './EmergenciesList.styles';
import {
  EmergenciesListItem,
  EmergencyListItem,
} from './EmergenciesListItem/EmergenciesListItem';

interface EmergenciesListProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Emergencies'>;
}

// TODO: use section list
export const EmergenciesList = (props: EmergenciesListProps) => {
  const emergenciesList: EmergencyListItem[] = [
    { title: 'Get directions to the nearest hospital', screen: 'GoogleMaps' },
    { title: 'COVID-19', screen: '' },
    { title: 'Open wound', screen: '' },
    { title: 'Nauseous', screen: '' },
  ];

  const handleNavigation = (screen: any, params: any) => {
    props.navigation.navigate(screen, params);
  };

  const renderItem = ({ item }: { item: EmergencyListItem }) => (
    <EmergenciesListItem
      emergencyListItem={item}
      navigate={handleNavigation}
      dark={item.screen === 'GoogleMaps'}
    />
  );

  return (
    <View style={styles.emergenciesList}>
      <FlatList
        data={emergenciesList}
        renderItem={renderItem}
        keyExtractor={(item, i) => i + item.title}
        numColumns={2}
      />
    </View>
  );
};
