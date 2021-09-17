import { Box, IconButton, Stagger, useDisclose } from 'native-base';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles, staggerStyles } from './StaggerButtons.style';
import call from 'react-native-phone-call';
import { colors } from '../../utils/colors';

export const StaggerButtons = () => {
  const { isOpen, onToggle } = useDisclose();
  const buttonSize = 48;
  const prompt = false;

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
            <MaterialCommunityIcons
              size={buttonSize}
              name='police-badge'
              color={colors.white}
            />
          }
          colorScheme='red'
          variant='solid'
          mb={4}
          onPress={() => call({ number: '166', prompt })}
        />
        <IconButton
          rounded='full'
          icon={
            <MaterialCommunityIcons
              size={buttonSize}
              name='fire-truck'
              color={colors.white}
            />
          }
          colorScheme='red'
          variant='solid'
          mb={4}
          onPress={() => call({ number: '160', prompt })}
        />
        <IconButton
          rounded='full'
          icon={
            <MaterialCommunityIcons
              size={buttonSize}
              name='hospital'
              color={colors.white}
            />
          }
          colorScheme='red'
          variant='solid'
          mb={4}
          onPress={() => call({ number: '161', prompt })}
        />
      </Stagger>
      <IconButton
        rounded='full'
        icon={
          <MaterialCommunityIcons
            size={buttonSize}
            name='phone-alert'
            color={colors.white}
          />
        }
        colorScheme='red'
        variant='solid'
        mb={4}
        onPress={onToggle}
      />
    </Box>
  );
};
