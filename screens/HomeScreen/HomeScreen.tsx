import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import React, { useRef } from 'react';
import { styles } from './HomeScreen.styles';
import { Box } from 'native-base';
import { CircularButton } from '../../components/CircularButton/CircularButton';
import { RootStackParamList } from '../screens';
import { StaggerButtons } from '../../components/StaggerButtons/StaggerButtons';
import { Modalize } from 'react-native-modalize';
import { EmergencyNumbersModal } from './EmergencyNumbersModal/EmergencyNumbersModal';
import { hospitalEmergencyNumbers } from '../../data/emergencyNumbers/hospitalEmergencyNumbers';
import { policeStationEmergencyNumbers } from '../../data/emergencyNumbers/policeStationEmergencyNumbers';
import { fireStationEmergencyNumbers } from '../../data/emergencyNumbers/fireStationEmergencyNumbers';

export interface HomeScreenProps {}

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const hospitalModalizeRef = useRef<Modalize>(null);
  const policeStationModalizeRef = useRef<Modalize>(null);
  const fireStationModalizeRef = useRef<Modalize>(null);

  return (
    <Box style={styles.container}>
      <CircularButton
        size={200}
        style={styles.button}
        dark={true}
        onPress={() => navigation.navigate('Emergencies', {})}
      >
        <Text style={styles.buttonText}>HELP</Text>
      </CircularButton>
      <StaggerButtons
        hospitalModalizeRef={hospitalModalizeRef}
        policeStationModalizeRef={policeStationModalizeRef}
        fireStationModalizeRef={fireStationModalizeRef}
      />
      <EmergencyNumbersModal
        ref={hospitalModalizeRef}
        type='Hospital'
        emergencyNumbers={hospitalEmergencyNumbers}
      />
      <EmergencyNumbersModal
        ref={policeStationModalizeRef}
        type='Police Station'
        emergencyNumbers={policeStationEmergencyNumbers}
      />
      <EmergencyNumbersModal
        ref={fireStationModalizeRef}
        type='Fire Station'
        emergencyNumbers={fireStationEmergencyNumbers}
      />
    </Box>
  );
};
