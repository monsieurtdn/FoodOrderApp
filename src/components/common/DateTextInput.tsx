import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Utils from 'common/Utils';
interface DateTextInputProps {
    onChangeValue?: (value: Date) => void;
    placeholder?: string;
    maximumDate?: Date;
    minimumDate?: Date;
}

const DateTextInput = ({
    onChangeValue,
    placeholder = 'Chọn ngày',
    maximumDate,
    minimumDate,
}: DateTextInputProps) => {
    const [showDate, setShowDate] = useState(false);
    const [dateValue, setDateValue] = useState<Date>();
    return (
        <View>
            {showDate && (
                <DateTimePicker
                    mode="date"
                    value={dateValue ?? new Date()}
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
                style={{
                    minHeight: 40,
                    flexDirection: 'row',
                    backgroundColor: '#EFF2F5',
                    alignItems: 'center',
                    flexGrow: 1,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                }}>
                <View style={{ flexGrow: 1 }}>
                    <Text
                        style={{
                            marginRight: 10,
                            fontWeight: '800',
                            fontSize: 16,
                            color: dateValue ? '#000000' : '#D4D4D4',
                            fontFamily: 'Lexend Deca',
                        }}>
                        {dateValue
                            ? Utils.convertToVNTimeZoneMbyMoment(
                                  dateValue,
                                  'DD/MM/YYYY',
                              )
                            : placeholder}
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
        </View>
    );
};
export default DateTextInput;
