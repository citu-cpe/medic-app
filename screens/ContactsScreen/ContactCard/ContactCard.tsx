import { Box, Image, Text } from 'native-base';
import React from 'react';
import { Contact } from 'expo-contacts';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../../data/storageKeys';

export interface ContactCardProps {
  contact: Contact;
  isEmergencyContact: boolean;
  onSave: () => void;
}

export const ContactCard = ({
  contact,
  isEmergencyContact,
  onSave,
}: ContactCardProps) => {
  let phoneNumber: string | undefined;
  const name = contact.name;
  if (contact.phoneNumbers && contact.phoneNumbers[0]) {
    phoneNumber = contact.phoneNumbers[0].number;
  }

  const saveToEmergencyContacts = async (contact: Contact) => {
    try {
      const emergencyContactsStringValue = await AsyncStorage.getItem(
        StorageKeys.EMERGENCY_CONTACTS
      );

      let emergencyContacts: string[] = [];

      if (emergencyContactsStringValue) {
        emergencyContacts = JSON.parse(emergencyContactsStringValue);
      }

      if (isEmergencyContact) {
        const contactIdToRemoveIndex = emergencyContacts.indexOf(contact.id);
        emergencyContacts.splice(contactIdToRemoveIndex, 1);
      } else {
        emergencyContacts.push(contact.id);
      }

      await AsyncStorage.setItem(
        StorageKeys.EMERGENCY_CONTACTS,
        JSON.stringify(emergencyContacts)
      );

      onSave();
    } catch (e) {
      // toast showing error message
    }
  };

  return (
    <Box
      flexDirection='row'
      alignContent='center'
      justifyContent='space-between'
      my={1}
      p={3}
      bgColor={colors.white}
      borderRadius={10}
    >
      <Box flexDirection='row'>
        <Image
          alt='profile'
          source={{
            uri:
              contact.image?.uri ||
              'http://stroseschool.stroselions.net/wp-content/uploads/2018/04/profile-blank-reva.png',
          }}
          size='sm'
          borderRadius={100}
          mr={3}
        />
        <Box justifyContent='space-evenly'>
          <Text fontWeight='bold' color={colors.black}>
            {name}
          </Text>
          <Text>{phoneNumber}</Text>
        </Box>
      </Box>

      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <TouchableOpacity onPress={() => saveToEmergencyContacts(contact)}>
          {isEmergencyContact ? (
            <MaterialIcons name='star' size={40} color={colors.red} />
          ) : (
            <MaterialIcons name='star-border' size={40} color={colors.black} />
          )}
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
