import React from 'react';
import { Text } from 'native-base';
import { colors } from '../../utils/colors';
import { TouchableOpacity } from 'react-native';
import { styles } from './TextMessageTemplate.style';

interface TextMessageTemplateProps {
  textMessage: string;
  onPress: () => void;
}

export const TextMessageTemplate = (props: TextMessageTemplateProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text fontWeight='bold' fontSize={20} color={colors.white}>
        {props.textMessage}
      </Text>
    </TouchableOpacity>
  );
};
