import { KeyboardDismiss } from 'common/Utils';
import CTextInput from 'components/CTextInput';
import React, { useState } from 'react';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface IInputProps {
    value: string;
    onChange: (val: string) => void;
    onBlur: () => void;
    onPress?: () => void;
    placeholder?: string;
    label: string;
    hasError: boolean;
    errMsg:
        | string
        | FieldError
        | Merge<FieldError, FieldErrorsImpl<any>>
        | undefined;
    editable?: boolean;
    right?: React.ReactNode;
    capitalize?: boolean;
}
const Input = ({
    value,
    onChange,
    onBlur,
    onPress,
    placeholder,
    label,
    hasError,
    errMsg,
    editable,
    right,
    capitalize = false,
}: IInputProps) => {
    return (
        <View style={styles.inputStyle}>
            <Text
                style={[
                    styles.labelStyle,
                    { color: hasError ? '#a50006' : '#2D3648' },
                ]}>
                {label}
            </Text>
            <CTextInput
                autoCapitalize={capitalize ? 'characters' : 'none'}
                onPressIn={onPress}
                style={{
                    borderRadius: 5,
                    borderColor: hasError ? '#a50006' : '#D9D9D9',
                }}
                onChangeText={onChange}
                placeholder={placeholder}
                onSubmitEditing={KeyboardDismiss}
                value={value}
                onBlur={onBlur}
                editable={editable}
                rightComponnent={right}
                // placeholderTextColor={'rgba(197, 229, 255, 1)'}
            />
            {hasError && <Text style={styles.errText}>{errMsg}</Text>}
        </View>
    );
};
const Password: any = ({
    value,
    onChange,
    onBlur,
    placeholder,
    label,
    hasError,
}: IInputProps) => {
    const [showPass, setShowPass] = useState(false);
    return (
        <View style={styles.inputStyle}>
            <Text
                style={[
                    styles.labelStyle,
                    { color: hasError ? '#a50006' : '#2D3648' },
                ]}>
                {label}
            </Text>
            <CTextInput
                style={{
                    borderRadius: 5,
                    borderColor: hasError ? '#a50006' : '#D9D9D9',
                    paddingRight: 5,
                }}
                onChangeText={onChange}
                placeholder={placeholder}
                onSubmitEditing={KeyboardDismiss}
                value={value}
                onBlur={onBlur}
                secureTextEntry={!showPass}
                rightComponnent={
                    <IconButton
                        icon={showPass ? 'eye' : 'eye-off'}
                        onPress={() => setShowPass(prev => !prev)}
                    />
                }
                // placeholderTextColor={'rgba(197, 229, 255, 1)'}
            />
            {hasError && (
                <Text style={styles.errText}>
                    Thông tin không được bỏ trống
                </Text>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    inputStyle: {
        flexDirection: 'column',
        rowGap: 5,
        marginVertical: 5,
        borderRadius: 0,
        justifyContent: 'space-between',
    },
    labelStyle: {
        fontWeight: '600',
        letterSpacing: 0.5,
        color: '#2D3648',
        fontSize: 15,
    },
    errText: {
        color: '#a50006',
        textAlign: 'right',
        fontSize: 13,
    },
});
Input.Password = Password;
export default Input;
