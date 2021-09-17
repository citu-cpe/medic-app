import { Box, Input, Text } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { ModalizeProps, Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { colors } from '../../../utils/colors';
import { ContactCard } from '../ContactCard/ContactCard';
import * as Contacts from 'expo-contacts';

interface ContactsModalProps {
  contacts: Contacts.Contact[];
  emergencyContactIds: string[];
  updateEmergencyContactIds: () => void;
}

export const ContactsModal = React.forwardRef(
  (props: ModalizeProps & ContactsModalProps, ref: React.ForwardedRef<any>) => {
    const [filteredContacts, setFilteredContacts] = useState<
      Contacts.Contact[]
    >([]);
    const [emergencyContactIds, setEmergencyContactIds] = useState<string[]>(
      []
    );

    const renderItem = ({ item }: ListRenderItemInfo<Contacts.Contact>) => {
      return (
        <ContactCard
          contact={item}
          onSave={updateContacts}
          isEmergencyContact={emergencyContactIds.includes(item.id)}
        />
      );
    };

    const keyExtractor = (item: Contacts.Contact) => item.id;

    const memoizedRenderItem = useCallback(renderItem, [
      filteredContacts,
      emergencyContactIds,
    ]);
    const memoizedKeyExtractor = useCallback(keyExtractor, [
      filteredContacts,
      emergencyContactIds,
    ]);

    const [searchInput, setSearchInput] = useState<string>('');

    useEffect(() => {
      setFilteredContacts(props.contacts);
    }, [props.contacts]);

    useEffect(() => {
      setEmergencyContactIds(props.emergencyContactIds);
    }, [props.emergencyContactIds]);

    useEffect(() => {
      const newFilteredContacts = props.contacts.filter(
        (contact: Contacts.Contact) => {
          const number = contact.phoneNumbers && contact.phoneNumbers[0].number;
          const nameMatches =
            contact.name &&
            contact.name
              .toLowerCase()
              .includes(searchInput.trim().toLowerCase());
          const numberMatches = number && number.includes(searchInput);

          return nameMatches || numberMatches;
        }
      );

      setFilteredContacts(newFilteredContacts);
    }, [searchInput]);

    const updateContacts = () => {
      props.updateEmergencyContactIds();
    };

    return (
      <Portal>
        <Modalize
          ref={ref}
          HeaderComponent={
            <Box>
              <Text
                fontSize={20}
                fontWeight='bold'
                textAlign='center'
                my={5}
                color={colors.white}
              >
                Add to Emergency Contacts
              </Text>
              <Input
                mb={2}
                color={colors.white}
                placeholder='Search Contacts'
                placeholderTextColor={colors.white}
                borderColor={colors.white}
                onChangeText={(text: string) => setSearchInput(text)}
              />
            </Box>
          }
          modalTopOffset={100}
          modalStyle={{ backgroundColor: colors.green, paddingHorizontal: 10 }}
          flatListProps={{
            data: filteredContacts,
            renderItem: memoizedRenderItem,
            keyExtractor: memoizedKeyExtractor,
            showsVerticalScrollIndicator: false,
            removeClippedSubviews: true,
            initialNumToRender: 2,
            maxToRenderPerBatch: 1,
            updateCellsBatchingPeriod: 100,
            windowSize: 7,
          }}
          onClose={() => {
            setFilteredContacts(props.contacts);
          }}
          {...props}
        />
      </Portal>
    );
  }
);
