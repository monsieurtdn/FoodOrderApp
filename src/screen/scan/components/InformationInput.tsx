import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

interface IProps {
    label: string;
    information: {
        value: string;
        err: string;
    };
    onTextChange: (value: string) => void;
    allowClear?: boolean;
    editable?: boolean;
    onFocus?: () => void;
}
export const InformationInput = ({
    editable = true,
    label,
    information,
    onTextChange,
    allowClear = true,
    onFocus = () => {},
}: IProps) => {
    const clearIcon = (
        <TextInput.Icon icon={'close'} onPress={() => onTextChange('')} />
    );
    return (
        <View style={styles.inputContainer}>
            <TextInput
                editable={editable}
                mode="outlined"
                value={information.value}
                label={label}
                onChangeText={value => onTextChange(value)}
                error={information.err !== ''}
                right={
                    allowClear &&
                    editable &&
                    information.value &&
                    information.value !== '' &&
                    clearIcon
                }
                onFocus={onFocus}
            />
            {information.err !== '' && (
                <Text style={styles.errText}>{information.err}</Text>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        gap: 8,
        marginBottom: 15,
    },
    errText: {
        color: '#a50006',
        textAlign: 'right',
    },
});
