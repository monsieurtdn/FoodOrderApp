import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Utils from 'common/Utils';
interface DateTextInputProps {
    label?: string;
    value?: Date;
    onChangeValue?: (value: Date) => void;
    placeholder?: string;
    maximumDate?: Date;
    minimumDate?: Date;
    hasError?: boolean;
    disabled?: boolean;
}

const DateSelect = ({
    label,
    value,
    onChangeValue,
    // placeholder = 'Chọn ngày',
    maximumDate,
    minimumDate,
    hasError,
    disabled = false,
}: DateTextInputProps) => {
    const [showDate, setShowDate] = useState(false);
    const [dateValue, setDateValue] = useState<Date>(new Date());
    return (
        <View style={styles.inputStyle}>
            {label && (
                <Text
                    style={[
                        styles.labelStyle,
                        { color: hasError ? '#a50006' : '#2D3648' },
                    ]}>
                    {label}
                </Text>
            )}
            {showDate && (
                <DateTimePicker
                    mode="date"
                    value={value ? value : dateValue}
                    // eslint-disable-next-line @typescript-eslint/no-shadow
                    onChange={(event, value) => {
                        showDate && setShowDate(false);
                        if (value && event?.type === 'set') {
                            setDateValue(value);
                            onChangeValue && onChangeValue(value);
                        }
                    }}
                    maximumDate={maximumDate ?? new Date()}
                    minimumDate={
                        minimumDate ?? new Date('2000-01-01T00:00:00.000Z')
                    }
                    display="spinner"
                    dateFormat={'day month year'}
                    dayOfWeekFormat={'{dayofweek.full}'}
                    placeholderText="select date"
                />
            )}
            <TouchableOpacity
                onPress={() => {
                    !showDate && setShowDate(true);
                }}
                style={[
                    {
                        minHeight: 50,
                        flexDirection: 'row',
                        // backgroundColor: '#EFF2F5',
                        alignItems: 'center',
                        flexGrow: 1,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: hasError ? '#a50006' : '#D9D9D9',
                    },
                ]}
                disabled={disabled}>
                <View style={{ flexGrow: 1 }}>
                    <Text
                        style={{
                            marginRight: 10,
                            // fontWeight: '800',
                            fontSize: 16,
                            color: dateValue ? '#000000' : '#D4D4D4',
                            fontFamily: 'Lexend Deca',
                        }}>
                        {/* {dateValue
                            ? Utils.convertToVNTimeZoneMbyMoment(
                                  dateValue,
                                  'DD/MM/YYYY',
                              )
                            : placeholder} */}
                        {value
                            ? Utils.convertToVNTimeZoneMbyMoment(
                                  value,
                                  'DD/MM/YYYY',
                              )
                            : Utils.convertToVNTimeZoneMbyMoment(
                                  dateValue,
                                  'DD/MM/YYYY',
                              )}
                    </Text>
                </View>
                <Image
                    source={require('../../../image/calendar.png')}
                    style={{
                        width: 20,
                        height: 18,
                        marginTop: 2,
                    }}
                />
            </TouchableOpacity>
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
        fontSize: 15,
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

export default DateSelect;
