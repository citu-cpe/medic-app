import { Contact } from 'expo-contacts';
import React from 'react';
import { Box } from 'native-base';
import { ContactCard } from '../ContactCard/ContactCard';
import { TouchableOpacity } from 'react-native';

interface EmergencyContactsProps {
  emergencyContacts: Contact[];
  updateEmergencyContactIds: () => void;
  onPress: (id: string) => void;
}

export const EmergencyContacts = ({
  emergencyContacts,
  updateEmergencyContactIds,
  onPress,
}: EmergencyContactsProps) => {
  const emergencyContactItems = emergencyContacts.map((item) => (
    <TouchableOpacity key={item.id} onPress={() => onPress(item.id)}>
      <ContactCard
        contact={item}
        isEmergencyContact={true}
        onSave={updateEmergencyContactIds}
      />
    </TouchableOpacity>
  ));

  return (
    <Box flex={1} mt={5} mb={50}>
      {emergencyContactItems}
    </Box>
  );
};
