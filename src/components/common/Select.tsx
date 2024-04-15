import React from 'react';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import { View, Text, StyleSheet, Image } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

interface IInputProps {
    options?: any;
    value: string;
    onChange: (val: string) => void;
    onBlur: () => void;
    label: string;
    hasError: boolean;
    valuePropName?: string;
    lablePropName?: string;
    placeholder?: string;
    errMsg:
        | string
        | FieldError
        | Merge<FieldError, FieldErrorsImpl<any>>
        | undefined;
    disabled?: boolean;
}
const Select = ({
    options,
    value,
    onChange,
    onBlur,
    label,
    hasError,
    valuePropName = 'value',
    lablePropName = 'lable',
    placeholder,
    errMsg,
    disabled = false,
}: IInputProps) => {
    const foundOption = value
        ? options.find((option: any) => option[valuePropName] === value)
        : undefined;

    return (
        <View style={styles.inputStyle}>
            <Text
                style={[
                    styles.labelStyle,
                    { color: hasError ? '#a50006' : '#2D3648' },
                ]}>
                {label}
            </Text>
            <SelectDropdown
                onBlur={onBlur}
                data={options ?? []}
                defaultButtonText={
                    foundOption
                        ? foundOption[lablePropName]
                        : placeholder || 'Hãy chọn giới tính của bạn'
                }
                onSelect={selectedItem => {
                    onChange(selectedItem[valuePropName]);
                }}
                buttonStyle={{
                    ...styles.selectDropdown,
                    borderColor: hasError ? '#a50006' : '#D9D9D9',
                }}
                renderDropdownIcon={() => (
                    <Image
                        source={require('../../../image/icon/arrow-down.png')}
                    />
                )}
                onChangeSearchInputText={() => {}}
                buttonTextAfterSelection={selectedItem => {
                    return selectedItem[lablePropName];
                }}
                rowTextForSelection={item => {
                    return item[lablePropName];
                }}
                rowStyle={styles.row}
                dropdownStyle={styles.dropdown}
                selectedRowStyle={styles.selectedRow}
                buttonTextStyle={{
                    ...styles.buttonText,
                    color: foundOption ? '#2D3648' : '#777474',
                }}
                disabled={disabled}
            />
            {hasError && <Text style={styles.errText}>{errMsg}</Text>}
        </View>
    );
};
const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        flexDirection: 'column',
        rowGap: 5,
        marginVertical: 5,
        borderRadius: 0,
        justifyContent: 'space-between',
    },
    selectDropdown: {
        backgroundColor: 'white',
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'left',
        justifyContent: 'flex-start',
    },
    labelStyle: {
        fontWeight: '600',
        letterSpacing: 0.5,
        color: '#2D3648',
        fontSize: 15,
    },
    row: { backgroundColor: 'white' },
    dropdown: { borderRadius: 6 },
    selectedRow: { backgroundColor: '#357edd40' },
    buttonText: {
        fontSize: 14,
        flex: 1,
        textAlign: 'left',
        paddingLeft: 3,
    },
    errText: {
        color: '#a50006',
        textAlign: 'right',
        fontSize: 13,
    },
});
export default Select;
