import { Box, Input, Text } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import { ModalizeProps, Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { colors } from '../../../utils/colors';
import { EmergencyNumberCard } from './EmergencyNumberCard/EmergencyNumberCard';
import uuid from 'uuid-random';

export interface EmergencyNumber {
  name: string;
  number: string;
  area: string;
}

interface EmergencyNumbersModalProps {
  type: 'Hospital' | 'Police Station' | 'Fire Station';
  emergencyNumbers: EmergencyNumber[];
}

export const EmergencyNumbersModal = React.forwardRef(
  (
    props: ModalizeProps & EmergencyNumbersModalProps,
    ref: React.ForwardedRef<any>
  ) => {
    const [filteredEmergencyNumbers, setFilteredEmergencyNumbers] = useState<
      EmergencyNumber[]
    >([]);

    const renderItem = ({ item }: ListRenderItemInfo<EmergencyNumber>) => {
      return <EmergencyNumberCard key={uuid()} emergencyNumber={item} />;
    };

    const keyExtractor = (item: any) => item.id;

    const memoizedRenderItem = useCallback(renderItem, []);
    const memoizedKeyExtractor = useCallback(keyExtractor, []);

    const [searchInput, setSearchInput] = useState<string>('');

    useEffect(() => {
      setFilteredEmergencyNumbers(props.emergencyNumbers);
    }, [props.emergencyNumbers]);

    useEffect(() => {
      const newEmergencyNumbers = props.emergencyNumbers.filter(
        (emergencyNumber: EmergencyNumber) => {
          const nameMatches =
            emergencyNumber.name &&
            emergencyNumber.name
              .toLowerCase()
              .includes(searchInput.trim().toLowerCase());
          const numberMatches = emergencyNumber.number.includes(searchInput);
          const areaMatches = emergencyNumber.area.includes(searchInput);
          return nameMatches || numberMatches || areaMatches;
        }
      );
      setFilteredEmergencyNumbers(newEmergencyNumbers);
    }, [searchInput]);

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
                Choose {props.type}s to Call
              </Text>
              <Input
                mb={2}
                color={colors.white}
                placeholder='Search '
                placeholderTextColor={colors.white}
                borderColor={colors.white}
                onChangeText={(text: string) => setSearchInput(text)}
              />
            </Box>
          }
          modalTopOffset={100}
          modalStyle={{ backgroundColor: colors.green, paddingHorizontal: 10 }}
          flatListProps={{
            data: filteredEmergencyNumbers,
            renderItem: memoizedRenderItem,
            keyExtractor: memoizedKeyExtractor,
            showsVerticalScrollIndicator: false,
            removeClippedSubviews: true,
            initialNumToRender: 2,
            maxToRenderPerBatch: 1,
            updateCellsBatchingPeriod: 100,
            windowSize: 7,
          }}
          {...props}
        />
      </Portal>
    );
  }
);
