import { Contact } from 'expo-contacts';
import React from 'react';
import { Box } from 'native-base';
import { ContactCard } from '../ContactCard/ContactCard';

interface EmergencyContactsProps {
  emergencyContacts: Contact[];
  updateEmergencyContactIds: () => void;
}

export const EmergencyContacts = ({
  emergencyContacts,
  updateEmergencyContactIds,
}: EmergencyContactsProps) => {
  const emergencyContactItems = emergencyContacts.map((item) => (
    <ContactCard
      contact={item}
      isEmergencyContact={true}
      onSave={updateEmergencyContactIds}
      key={item.id}
    />
  ));

  return (
    <Box flex={1} my={5}>
      {emergencyContactItems}
    </Box>
  );
};
