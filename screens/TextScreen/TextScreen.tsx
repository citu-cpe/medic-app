import React, { useEffect, useRef, useState } from 'react';
import { Box, TextArea, Text, ScrollView, Spinner } from 'native-base';
import {
  Keyboard,
  KeyboardEvent,
  Dimensions,
  LayoutChangeEvent,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils/colors';
import { isIOS } from '../../utils/isIOS';
import { getTextMessageTemplates } from '../../utils/textMessageTemplates';
import { TextMessageTemplate } from '../../components/TextMessageTemplate/TextMessageTemplate';
import { Contact } from 'expo-contacts';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import * as SMS from 'expo-sms';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Screens';

const windowHeight = Dimensions.get('window').height;

export interface TextScreenProps {
  emergencyContacts: Contact[];
  smsAvailable: boolean;
  emergencyContactId?: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Text'>;

export const TextScreen = ({ route }: Props) => {
  const [textMessage, setTextMessage] = useState<string>('');
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [scrollViewMaxHeight, setScrollViewMaxHeight] = useState(0);
  const [location, setLocation] = useState<string>('');
  const [locationLoading, setLocationLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [name, setName] = useState<string | null>(null);

  const onKeyboardShow = (event: KeyboardEvent) =>
    setKeyboardOffset(event.endCoordinates.height - 49);

  const onKeyboardHide = () => setKeyboardOffset(0);

  const keyboardDidShowListener = useRef<any>();
  const keyboardDidHideListener = useRef<any>();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardShow
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardHide
    );

    if (route.params.emergencyContactId) {
      const name = route.params.emergencyContacts.find(
        (contact) => contact.id === route.params.emergencyContactId
      )?.name;
      setName(name || null);
    }

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});

      if (coords) {
        const { latitude, longitude } = coords;

        const address = (
          await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          })
        )[0];

        if (address) {
          setLocation(
            `
My Location:
Postal Code: ${address.postalCode || 'unknown'}
Street: ${address.street || 'unknown'}
Subregion: ${address.subregion || 'unknown'}
City: ${address.city || 'unknown'}
State: ${address.region || 'unknown'}
Country: ${address.country || 'unknown'}`.trim()
          );
        }
      }

      setLocationLoading(false);
    })();
  }, []);

  const textMessageTemplates = getTextMessageTemplates(location);

  const onTextMessageTemplateClick = (textMessageTemplate: string) => {
    setTextMessage(textMessageTemplate);
  };

  const updateMaxHeight = (e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height;
    setScrollViewMaxHeight(windowHeight - height - 175);
  };

  const sendTextMessage = async (textMessage: string) => {
    let emergencyContacts = route.params.emergencyContacts;

    if (route.params.emergencyContactId) {
      emergencyContacts = emergencyContacts.filter(
        (contact) => contact.id === route.params.emergencyContactId
      );
    }

    const numbers = emergencyContacts
      .filter(
        (contact) => contact.phoneNumbers && contact.phoneNumbers.length > 0
      )
      .filter((contact) => contact.phoneNumbers![0].number)
      .map((contact) => contact.phoneNumbers![0].number!);

    if (numbers) {
      setIsSending(true);
      await SMS.sendSMSAsync(numbers, textMessage);
      setIsSending(false);
      setTextMessage('');
    }
  };

  return (
    <Box
      flex={1}
      bgColor={colors.beige}
      position='relative'
      paddingTop={isIOS ? 10 : 5}
    >
      <Box flex={1} width='90%' margin='auto'>
        <Text fontSize={20} fontWeight='bold' color={colors.red}>
          Send Text to {name ? name : 'All Emergency Contacts'}
        </Text>
        <Text fontSize={18} fontWeight='bold' color={colors.green} my={3}>
          Choose from one of the templates:
        </Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          maxHeight={scrollViewMaxHeight}
          flex={1}
        >
          {locationLoading ? (
            <Spinner
              accessibilityLabel='Loading templates'
              color={colors.red}
              mt={3}
            />
          ) : (
            <Box width='90%' margin='auto'>
              {textMessageTemplates.map((template) => (
                <TextMessageTemplate
                  textMessage={template}
                  key={template}
                  onPress={() => onTextMessageTemplateClick(template)}
                />
              ))}
            </Box>
          )}
        </ScrollView>
      </Box>
      <Box
        position='absolute'
        bottom={keyboardOffset}
        width='100%'
        onLayout={updateMaxHeight}
      >
        <Box
          flex={1}
          flexDirection='row'
          justifyContent='space-between'
          width='90%'
          margin='auto'
          bgColor={colors.beige}
          pt={!isTyping ? 3 : 0}
        >
          <Text fontSize={18} fontWeight='bold' color={colors.green}>
            Or write your own:
          </Text>
          <TouchableOpacity onPress={() => setTextMessage('')}>
            <Text fontSize={18} fontWeight='bold' color={colors.red}>
              Clear
            </Text>
          </TouchableOpacity>
        </Box>
        <Box
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          bgColor={colors.beige}
          py={3}
          pl={3}
        >
          <TextArea
            bgColor={colors.white}
            color={colors.red}
            placeholder={
              route.params.smsAvailable
                ? 'Message'
                : 'SMS is not available on this device'
            }
            fontWeight='bold'
            fontSize={20}
            numberOfLines={1}
            maxHeight={100}
            onChangeText={(text) => setTextMessage(text)}
            value={textMessage}
            onFocus={() => setIsTyping(false)}
            onBlur={() => setIsTyping(true)}
            flex={1}
            isDisabled={!route.params.smsAvailable}
          />
          <TouchableOpacity
            style={{ marginHorizontal: 10 }}
            disabled={textMessage.trim().length === 0}
            onPress={() => sendTextMessage(textMessage)}
          >
            {isSending ? (
              <Spinner
                accessibilityLabel='Sending message'
                color={colors.red}
              />
            ) : (
              <MaterialIcons
                name='send'
                color={
                  textMessage.trim().length === 0 ? colors.black : colors.red
                }
                size={30}
              />
            )}
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};
