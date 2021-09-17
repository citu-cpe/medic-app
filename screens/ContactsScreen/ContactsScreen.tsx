import { Box, Text, ScrollView } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Modalize } from 'react-native-modalize';
import { colors } from '../../utils/colors';
import { Platform, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ContactsModal } from './ContactsModal/ContactsModal';
import * as Contacts from 'expo-contacts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../data/storageKeys';
import { EmergencyContacts } from './EmergencyContacts/EmergencyContacts';

const isIOS = Platform.OS === 'ios';

export const ContactsScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<
    Contacts.Contact[]
  >([]);
  const [emergencyContactIds, setEmergencyContactIds] = useState<string[]>([]);
  const [trigger, setTrigger] = useState<boolean>();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        setContacts(data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const emergencyContactStringValues = await AsyncStorage.getItem(
        StorageKeys.EMERGENCY_CONTACTS
      );

      if (emergencyContactStringValues) {
        setEmergencyContactIds(JSON.parse(emergencyContactStringValues));
      }
    })();
  }, [trigger]);

  useEffect(() => {
    const emergencyContacts = contacts.filter((contact) =>
      emergencyContactIds.includes(contact.id)
    );

    setEmergencyContacts(emergencyContacts);
  }, [contacts, emergencyContactIds]);

  const updateEmergencyContactIds = () => {
    setTrigger(!trigger);
  };

  return (
    <ScrollView
      flex={1}
      bgColor={colors.beige}
      paddingTop={isIOS ? 10 : 5}
      paddingX={5}
    >
      <Box flexDirection='row' justifyContent='space-between'>
        <Text fontWeight='bold' fontSize={25} color={colors.red}>
          Emergency Contacts
        </Text>
        <TouchableOpacity onPress={() => modalizeRef.current?.open()}>
          <MaterialIcons name='add' size={30} color={colors.red} />
        </TouchableOpacity>
      </Box>
      <EmergencyContacts
        emergencyContacts={emergencyContacts}
        updateEmergencyContactIds={updateEmergencyContactIds}
      />
      <ContactsModal
        ref={modalizeRef}
        contacts={contacts}
        emergencyContactIds={emergencyContactIds}
        updateEmergencyContactIds={updateEmergencyContactIds}
      />
    </ScrollView>
  );
};
