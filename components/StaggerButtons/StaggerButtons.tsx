import { Box, IconButton, Stagger, useDisclose } from 'native-base';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles, staggerStyles } from './StaggerButtons.style';

export const StaggerButtons = () => {
  const { isOpen, onToggle } = useDisclose();
  const buttonSize = 48;

  return (
    <Box style={styles.container}>
      <Stagger
        visible={isOpen}
        initial={staggerStyles.initial}
        animate={staggerStyles.animate}
        exit={staggerStyles.exit}
      >
        <IconButton
          rounded='full'
          icon={
            <MaterialCommunityIcons size={buttonSize} name='police-badge' />
          }
          colorScheme='red'
          variant='solid'
          mb={4}
        />
        <IconButton
          rounded='full'
          icon={<MaterialCommunityIcons size={buttonSize} name='fire-truck' />}
          colorScheme='red'
          variant='solid'
          mb={4}
        />
        <IconButton
          rounded='full'
          icon={<MaterialCommunityIcons size={buttonSize} name='hospital' />}
          colorScheme='red'
          variant='solid'
          mb={4}
        />
      </Stagger>
      <IconButton
        rounded='full'
        icon={<MaterialCommunityIcons size={buttonSize} name='phone-alert' />}
        colorScheme='red'
        variant='solid'
        mb={4}
        onPress={onToggle}
      />
    </Box>
  );
};
