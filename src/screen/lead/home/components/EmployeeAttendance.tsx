import Utils from 'common/Utils';
import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { IEmployeeOfOperator } from 'store/controls/AttendanceEpic';
import MealCheckbox from './MealCheckbox';

type Props = {
    employee: IEmployeeOfOperator;
    handleClickMealCheckbox: (
        value: IEmployeeOfOperator,
        mealIdx: number,
    ) => void;
    handleOpenNotePopup: () => void;
    handleOpenCheckInHistoryPopup: () => void;
    handleSelectEmployee: (employee: IEmployeeOfOperator) => void;
};

const EmployeeAttendance = (props: Props) => {
    const {
        employee,
        handleClickMealCheckbox,
        handleOpenNotePopup,
        handleOpenCheckInHistoryPopup,
        handleSelectEmployee,
    } = props;

    let checkInTime = employee.employeeDate[0].checkInTime;

    let isGreen = false;

    let checkInTimeString = '';
    if (checkInTime.length > 0) {
        // const newDate = Utils.convertToLocalTime(checkInTime[0].date);
        // console.log(
        //     'newDate: ',
        //     newDate,
        //     newDate.toISOString(),
        //     newDate.toLocaleString(),
        // );
        // checkInTimeString = moment(newDate).format('HH:mm'); // utc

        // từ BE lấy data lên thì phải convert sang dạng local time,
        // sau khi convert xong thì mới có thể dùng data đó để so sánh với những biến kiểu Date
        const newDateList = checkInTime.map(checkTime =>
            Utils.convertToLocalTime(checkTime.date),
        );
        let maxDate = newDateList[0]; // Giả sử phần tử đầu tiên là lớn nhất

        newDateList.forEach(function (date) {
            if (date > maxDate) {
                maxDate = date;
            }
        });
        // console.log(maxDate, 'maxDate');
        checkInTimeString = moment(maxDate).format('HH:mm'); // utc
        if (newDateList.length > 0) {
            isGreen = true;
        }
    }

    let noteContent = '';
    const notes = employee.employeeDate[0].notes;
    if (notes.length > 0) {
        noteContent = notes[notes.length - 1].content;
    }

    const meals = employee.employeeDate[0].meals[0];
    // const mealsInfo = JSON.parse(meals.information);
    const mealInfoObject: {
        meal1: number;
        meal2: number;
    } =
        meals.information !== null
            ? JSON.parse(meals.information)
            : { meal1: 0, meal2: 0 };
    return (
        <View
            style={{
                // width: '90%',
                // height: 110,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isGreen
                    ? 'rgba(217, 247, 190, 1)'
                    : 'rgba(234, 246, 255, 1)',
                borderWidth: 2,
                borderRadius: 5,
                borderColor: isGreen
                    ? 'rgba(115, 209, 61, 1)'
                    : 'rgba(217, 217, 217, 1)',
                elevation: 5,
                marginVertical: 5,
                marginHorizontal: 20,
                paddingVertical: 10,
            }}>
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                <View
                    style={{
                        width: '70%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        paddingLeft: 20,
                    }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: isGreen ? '#000' : '#rgba(140, 140, 140, 1)',
                        }}>
                        {employee.name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            color: isGreen ? '#000' : '#rgba(140, 140, 140, 1)',
                        }}>
                        {employee.employeeCode ? employee.employeeCode : ''}
                        {' - '}
                        {employee.jobTitle ? employee.jobTitle : ''}
                    </Text>
                </View>

                <MealCheckbox
                    employee1={employee}
                    jsonObject={mealInfoObject}
                    handleClickMealCheckbox={handleClickMealCheckbox}
                />
            </View>
            <View
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                <View
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 10,
                        paddingLeft: 20,
                        // backgroundColor: 'red',
                    }}>
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            width: 90,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            handleOpenCheckInHistoryPopup();
                            handleSelectEmployee(employee);
                        }}>
                        <IconButton
                            style={{
                                height: 20,
                                width: 20,
                            }}
                            icon={'account-check-outline'}
                            iconColor={
                                isGreen ? '#000' : 'rgba(140, 140, 140, 1)'
                            }
                            size={20}
                            // onPress={() => {
                            //     handleNavigateFaceCheckScreen();
                            // }}
                        />
                        <Text
                            style={{
                                fontSize: 16,
                                color: isGreen
                                    ? '#000'
                                    : '#rgba(140, 140, 140, 1)',
                            }}>
                            {checkInTimeString}
                        </Text>
                    </TouchableOpacity>
                    <IconButton
                        style={{
                            height: 30,
                            width: 30,
                        }}
                        icon={'chat-processing-outline'}
                        iconColor={
                            noteContent !== ''
                                ? 'red'
                                : 'rgba(140, 140, 140, 1)'
                        }
                        size={20}
                        onPress={() => {
                            handleOpenNotePopup();
                            handleSelectEmployee(employee);
                        }}
                    />
                </View>
            </View>
        </View>
    );
};

export default EmployeeAttendance;

// const styles = StyleSheet.create({});
