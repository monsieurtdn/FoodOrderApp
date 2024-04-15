import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface IProps {
    data: any[];
}
export const GuestSelect = ({ data }: IProps) => {
    return (
        <SelectDropdown
            data={data ?? []}
            defaultButtonText={data[0].name}
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
            }}
            buttonStyle={styles.selectDropdown}
            renderDropdownIcon={() => (
                <Image
                    source={require('../../../../image/icon/arrow-down.png')}
                />
            )}
            onChangeSearchInputText={() => {}}
            buttonTextAfterSelection={selectedItem => {
                return selectedItem.name;
            }}
            rowTextForSelection={item => {
                return item.name;
            }}
            rowStyle={{
                backgroundColor: 'white',
            }}
            dropdownStyle={{ borderRadius: 6 }}
            selectedRowStyle={{
                backgroundColor: '#357edd40',
            }}
            buttonTextStyle={{
                fontSize: 16,
                fontWeight: '600',
            }}
            renderCustomizedRowChild={selectedItem => (
                <Text
                    style={{
                        paddingHorizontal: 20,
                        fontSize: 16,
                    }}>
                    {selectedItem.name}
                </Text>
            )}
            dropdownOverlayColor="transparent"
        />
    );
};
const styles = StyleSheet.create({
    selectDropdown: {
        backgroundColor: 'white',
        maxWidth: 180,
    },
});
