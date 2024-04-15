import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IEmployeeInfo } from 'store/controls/EmployeeEpic';

interface IUserProfileCard {
    employeeInfo: IEmployeeInfo | null;
}

export const UserProfileCard: React.FC<IUserProfileCard> = props => {
    const { employeeInfo } = props;
    return (
        <LinearGradient
            colors={['#0050B3', '#588CCC']}
            style={styles.card}
            locations={[0.55, 1]}>
            <Image
                source={require('../../../../../image/default-avatar.png')}
                style={styles.avatar}
            />
            <View style={styles.informationWrapper}>
                <Text style={styles.name}>
                    {employeeInfo?.firstName}
                    {employeeInfo?.middleName} {employeeInfo?.lastName}
                </Text>
                {/* <Text style={styles.email}>
                    {userInfo?.email ? userInfo.email : 'Trống'}
                </Text> */}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 6,
        minHeight: 96,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        borderWidth: 2,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 6.27,
        zIndex: 10,
    },
    informationWrapper: {
        flexDirection: 'column',
        gap: 2,
    },
    name: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    email: {
        color: '#D7D7D7',
        fontSize: 13,
    },
});
