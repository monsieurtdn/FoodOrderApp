import { BottomTabNavigationHelpers } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { Screen } from 'common/screenEnums';
import CQuestionModel from 'components/model/CQuestionModel';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { logout } from 'store/controls/LoginEpic';
import { resetPersitValue } from 'store/controls/PersistToSave';
import { UserProfileCard } from './components/UserProfileCard';
import { ProfileMenu } from './components/ProfileMenu';
import { useSelectorRoot } from 'store/store';

const ProfileScreen = (props: { navigation: BottomTabNavigationHelpers }) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    // const { userInfo } = useSelectorRoot(state => state.persist);
    const { employeeInfo } = useSelectorRoot(state => state.employee);

    const [showLogout, setShowLogout] = useState(false);
    const handleLogout = () => {
        dispatch(logout());
        dispatch(resetPersitValue());
        navigation.navigate(Screen.Auth);
    };
    return (
        <SafeAreaView style={styles.container}>
            <CQuestionModel
                isVisible={showLogout}
                title={'Đăng xuất'}
                message={'Bạn có chắc muốn đăng xuất không?'}
                onClick={value => {
                    setShowLogout(false);
                    value && handleLogout();
                }}
            />
            <ScrollView contentContainerStyle={styles.scrollView}>
                <UserProfileCard
                    employeeInfo={employeeInfo ? employeeInfo : null}
                />
                <ProfileMenu
                    navigation={navigation}
                    showLogout={() => setShowLogout(true)}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FBFBFB',
    },
    scrollView: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
        backgroundColor: '#FBFBFB',
    },
});

export default ProfileScreen;
