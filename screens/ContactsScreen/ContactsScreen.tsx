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
import { CircularButton } from '../../components/CircularButton/CircularButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Screens';
import * as SMS from 'expo-sms';

const isIOS = Platform.OS === 'ios';

export interface ContactsScreenProps {}

type Props = NativeStackScreenProps<RootStackParamList, 'Contacts'>;

export const ContactsScreen = ({ navigation }: Props) => {
  const modalizeRef = useRef<Modalize>(null);
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [emergencyContacts, setEmergencyContacts] = useState<
    Contacts.Contact[]
  >([]);
  const [emergencyContactIds, setEmergencyContactIds] = useState<string[]>([]);
  const [trigger, setTrigger] = useState(false);
  const [smsAvailable, setSmsAvailable] = useState(false);
  const [reloadContactsTrigger, setReloadContactsTrigger] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();

        setContacts(data);
      }

      const smsAvailable = await SMS.isAvailableAsync();
      setSmsAvailable(smsAvailable);
    })();
  }, [reloadContactsTrigger]);

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

  const reloadContacts = () => {
    setReloadContactsTrigger(!reloadContactsTrigger);
  };

  const updateEmergencyContactIds = () => {
    setTrigger(!trigger);
  };

  const navigateToEmergencyContactMessage = (emergencyContactId: string) => {
    navigation.navigate('Text', {
      emergencyContacts,
      smsAvailable,
      emergencyContactId,
    });
  };

  return (
    <Box flex={1}>
      <ScrollView flex={1} bgColor={colors.beige} paddingTop={isIOS ? 10 : 5}>
        <Box
          flexDirection='row'
          justifyContent='space-between'
          width='90%'
          margin='auto'
          flex={1}
        >
          <Text fontWeight='bold' fontSize={25} color={colors.red}>
            Emergency Contacts
          </Text>
          <TouchableOpacity onPress={() => modalizeRef.current?.open()}>
            <MaterialIcons name='add' size={30} color={colors.red} />
          </TouchableOpacity>
        </Box>
        <Box
          bgColor={colors.red}
          width='90%'
          margin='auto'
          flex={1}
          borderRadius={10}
          paddingY={2}
          marginTop={5}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('AddContact', { onReturn: reloadContacts })
            }
          >
            <Text
              color={colors.white}
              textAlign='center'
              fontSize={20}
              fontWeight='bold'
            >
              Add New Contact
            </Text>
          </TouchableOpacity>
        </Box>
        <Box width='90%' margin='auto' flex={1}>
          <EmergencyContacts
            emergencyContacts={emergencyContacts}
            updateEmergencyContactIds={updateEmergencyContactIds}
            onPress={(id: string) => navigateToEmergencyContactMessage(id)}
          />
        </Box>
      </ScrollView>
      <Box position='absolute' bottom={5} right={10}>
        <CircularButton
          dark={true}
          size={70}
          onPress={() =>
            navigation.navigate('Text', { emergencyContacts, smsAvailable })
          }
        >
          <MaterialIcons name='textsms' size={30} color={colors.white} />
        </CircularButton>
      </Box>
      <ContactsModal
        ref={modalizeRef}
        contacts={contacts}
        emergencyContactIds={emergencyContactIds}
        updateEmergencyContactIds={updateEmergencyContactIds}
      />
    </Box>
  );
};
