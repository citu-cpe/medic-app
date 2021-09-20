import React from 'react';
import { Text, Box } from 'native-base';
import { colors } from '../../utils/colors';
import { TouchableOpacity } from 'react-native';

interface TextMessageTemplateProps {
  textMessage: string;
  onPress: () => void;
}

export const TextMessageTemplate = (props: TextMessageTemplateProps) => {
  return (
    <Box
      flex={1}
      shadow={3}
      bgColor={colors.white}
      my={3}
      p={3}
      borderRadius={10}
    >
      <TouchableOpacity onPress={props.onPress}>
        <Text fontWeight='bold' fontSize={20} color={colors.red}>
          {props.textMessage}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};
