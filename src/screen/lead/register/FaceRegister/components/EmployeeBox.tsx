import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IEmployeeByOperatorId } from 'store/controls/OperatorsEpic';
import { IconButton } from 'react-native-paper';

type Props = {
    employee: IEmployeeByOperatorId;
    handleRegisterSelectedEmployee: (employee: IEmployeeByOperatorId) => void;
};

const EmployeeBox = (props: Props) => {
    const { employee, handleRegisterSelectedEmployee } = props;
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    borderWidth: employee.awsUserId !== '' ? 0 : 1,
                    borderColor: employee.awsUserId !== '' ? 'white' : 'red',
                },
            ]}
            onPress={() => {
                // console.log('aloo');
                handleRegisterSelectedEmployee(employee);
            }}>
            <View style={styles.infoBox}>
                <Text style={styles.textStyle}>{employee.name}</Text>
                {employee.awsUserId ? (
                    <IconButton
                        style={{
                            // backgroundColor: 'red',
                            width: 40,
                            height: 40,
                        }}
                        icon={'close'}
                        // iconColor={'#FFFFFF'}
                        size={25}
                    />
                ) : (
                    <View />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        // width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        elevation: 5,
        marginHorizontal: 15,
        marginVertical: 10,
    },
    infoBox: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    textStyle: {
        paddingLeft: 19,
    },
});

export default EmployeeBox;
