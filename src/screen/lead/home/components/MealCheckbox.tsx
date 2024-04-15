import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Checkbox } from 'react-native-paper';
import { IEmployeeOfOperator } from 'store/controls/AttendanceEpic';

type Props = {
    employee1: IEmployeeOfOperator;
    jsonObject: {
        meal1: number;
        meal2: number;
    };
    handleClickMealCheckbox: (
        value: IEmployeeOfOperator,
        mealIdx: number,
    ) => void;
};

const MealCheckbox: React.FC<Props> = props => {
    const { employee1, jsonObject, handleClickMealCheckbox } = props;
    return (
        <View
            style={{
                width: '30%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <TouchableOpacity
                style={{
                    width: 45,
                    height: 45,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'red'
                }}
                onPress={() => {
                    handleClickMealCheckbox(employee1, 1);
                }}>
                <Checkbox.Android
                    status={jsonObject?.meal1 === 1 ? 'checked' : 'unchecked'}
                    uncheckedColor={'#1890FF'}
                    color={'#1890FF'}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    width: 45,
                    height: 45,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: 'red'
                }}
                onPress={() => {
                    handleClickMealCheckbox(employee1, 2);
                }}>
                <Checkbox.Android
                    status={jsonObject?.meal2 === 1 ? 'checked' : 'unchecked'}
                    uncheckedColor={'#1890FF'}
                    color={'#1890FF'}
                />
            </TouchableOpacity>
        </View>
    );
};

export default React.memo(MealCheckbox);
