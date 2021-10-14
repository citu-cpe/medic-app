import { Box, IconButton, Stagger, useDisclose } from 'native-base';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { staggerStyles } from './StaggerButtons.style';
import { colors } from '../../utils/colors';
import { IHandles } from 'react-native-modalize/lib/options';

interface StaggerButtonsProps {
  hospitalModalizeRef: React.RefObject<IHandles>;
  policeStationModalizeRef: React.RefObject<IHandles>;
  fireStationModalizeRef: React.RefObject<IHandles>;
}

export const StaggerButtons = (props: StaggerButtonsProps) => {
  const { isOpen, onToggle } = useDisclose();
  const buttonSize = 48;

  return (
    <Box position='absolute' bottom={5} left={10}>
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
          onPress={() => props.policeStationModalizeRef.current?.open()}
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
          onPress={() => props.fireStationModalizeRef.current?.open()}
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
          onPress={() => props.hospitalModalizeRef.current?.open()}
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
