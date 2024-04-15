import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Input from 'components/common/Input';
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';

interface IProps {
    label: string;
    value: string;
    onDateChange: (value: string) => void;
    onIconClick?: () => void;
    hasError: boolean;
    placeholder?: string;
    editable?: boolean;
    errMsg:
        | string
        | FieldError
        | Merge<FieldError, FieldErrorsImpl<any>>
        | undefined;
}
export const DateInput = ({
    label,
    value,
    hasError,
    editable,
    onDateChange,
    errMsg,
    placeholder,
}: IProps) => {
    const [showDate, setShowDate] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShowDate = () => {
        !showDate && setShowDate(true);
    };
    return (
        <TouchableOpacity
            onPress={handleShowDate}
            disabled={loading}
            style={styles.inputContainer}
            activeOpacity={0.8}>
            {editable && showDate && (
                <DateTimePicker
                    mode="date"
                    value={
                        value && moment(value, 'DD/MM/YYYY', true).isValid()
                            ? moment(value, 'DD/MM/YYYY').toDate()
                            : new Date()
                    }
                    onChange={(event, dateValue) => {
                        setLoading(true);
                        showDate && setShowDate(false);
                        if (dateValue && event?.type === 'set') {
                            onDateChange &&
                                onDateChange(
                                    moment(dateValue).format('DD/MM/YYYY'),
                                );
                        }
                        setLoading(false);
                    }}
                    display="spinner"
                    // dateFormat={'day month year'}
                    // dayOfWeekFormat={'{dayofweek.full}'}
                    // placeholderText="select date"
                />
            )}
            <Input
                value={value}
                onChange={() => {}}
                onBlur={() => {}}
                onPress={handleShowDate}
                label={label}
                editable={false}
                hasError={hasError}
                errMsg={errMsg}
                placeholder={placeholder}
                right={
                    <IconButton
                        icon={'calendar'}
                        onPress={handleShowDate}
                        style={{ transform: [{ translateX: 10 }] }}
                    />
                }
            />
            {loading && (
                <View style={[styles.loadingOverlay, StyleSheet.absoluteFill]}>
                    <ActivityIndicator color="#1890FF" />
                </View>
            )}
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'column',
        gap: 8,
        marginBottom: 10,
        position: 'relative',
    },
    errText: {
        color: 'red',
        textAlign: 'right',
    },
    loadingOverlay: {
        position: 'absolute',
        backgroundColor: '#0000000a',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
