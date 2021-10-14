import React from 'react';
import { EmergencyNumber } from '../EmergencyNumbersModal';
import call from 'react-native-phone-call';
import { Box } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../../utils/colors';
import { Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

interface EmergencyNumberCardProps {
  emergencyNumber: EmergencyNumber;
}

export const EmergencyNumberCard = (props: EmergencyNumberCardProps) => {
  return (
    <Box
      flexDirection='row'
      alignContent='center'
      justifyContent='space-between'
      my={1}
      p={3}
      bgColor={colors.white}
      borderRadius={10}
      shadow={3}
    >
      <Box flexDirection='row'>
        <Box justifyContent='space-evenly'>
          <Text fontWeight='bold' color={colors.black}>
            {props.emergencyNumber.name}
          </Text>
          <Text fontStyle='italic' color={colors.black} marginY={1}>
            {props.emergencyNumber.area}
          </Text>
          <Text>{props.emergencyNumber.number}</Text>
        </Box>
      </Box>

      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <TouchableOpacity
          onPress={() =>
            call({ number: props.emergencyNumber.number, prompt: true })
          }
        >
          <MaterialIcons name='phone' size={40} color={colors.red} />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
