import React, { useEffect, useState } from 'react';
import { Box, Text, Input } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Screens';
import { colors } from '../../utils/colors';
import { addContactAsync, Contact } from 'expo-contacts';
import { TouchableOpacity } from 'react-native';
import uuid from 'uuid-random';

export interface AddContactScreenProps {
  onReturn: () => void;
}

type Props = NativeStackScreenProps<RootStackParamList, 'AddContact'>;

export const AddContactScreen = ({ navigation, route }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState<string>('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [firstName, lastName, number]);

  const addContact = async () => {
    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      number.length === 0
    ) {
      setHasError(true);
      return;
    }

    const contact: Contact = {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      id: uuid(),
      contactType: 'person',
      phoneNumbers: [{ number, label: 'mobile', id: uuid() }],
    };

    await addContactAsync(contact);

    route.params.onReturn();
    navigation.goBack();
  };

  const inputMargin = 2;

  return (
    <Box flex={1} bgColor={colors.beige} paddingTop={10}>
      <Text
        fontWeight='bold'
        fontSize={25}
        color={colors.red}
        textAlign='center'
      >
        Add New Contact
      </Text>
      <Box width='90%' marginX='auto'>
        <Input
          placeholder='First Name'
          onChangeText={(firstName) => setFirstName(firstName)}
          marginY={inputMargin}
          borderColor={colors.black}
        />
        <Input
          placeholder='Last Name'
          onChangeText={(lastName) => setLastName(lastName)}
          marginY={inputMargin}
          borderColor={colors.black}
        />
        <Input
          placeholder='Phone Number'
          onChangeText={(phoneNumber) => setNumber(phoneNumber)}
          marginY={inputMargin}
          borderColor={colors.black}
          keyboardType='numeric'
        />
        {hasError && (
          <Text color={colors.red} marginTop={2}>
            Please fill out all form fields
          </Text>
        )}
        <Box bgColor={colors.red} borderRadius={10} paddingY={2} marginTop={5}>
          <TouchableOpacity onPress={addContact}>
            <Text
              color={colors.white}
              textAlign='center'
              fontSize={20}
              fontWeight='bold'
            >
              Add
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};
