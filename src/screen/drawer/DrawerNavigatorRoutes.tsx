// Import React
import React, { useEffect, useState } from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import Utils from 'common/Utils';
import { ResponseToken } from 'common/define-types';
import { Screen } from 'common/screenEnums';
import CQuestionModel from 'components/model/CQuestionModel';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import AttendanceScreen from 'screen/attendance/AttendanceScreen';
import FrontFaceScreen from 'screen/register/FrontFaceScreen';
import RegisterFaceScreen from 'screen/register/RegisterFaceScreen';
import SuccessfullRegisterScreen from 'screen/register/SuccessfullRegisterScreen';
import { setRegisterName } from 'store/controls/Camera.slice';
import { logout, setLoginSuccess } from 'store/controls/LoginEpic';
import { useSelectorRoot } from 'store/store';
import HomeScreen from '../HomeScreen';

interface IHomeStack {
    navigation: any;
}

const Stack = createStackNavigator();

export const HomeScreenStack: React.FC<IHomeStack> = props => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const { user } = useSelectorRoot(x => x.login);
    // DeviceEventEmitter.addListener('unauthenticate.event', (value: boolean) => {
    //     if(value) {
    //         navigation.navigate(Screen.Auth);
    //     }
    // });
    useEffect(() => {
        if (!Utils.token) {
            Utils.getValueLocalStorage(Utils.constant.token).then(
                async (token: ResponseToken) => {
                    if (token != null) {
                        var data = await Utils.getValueLocalStorage(
                            Utils.constant.user,
                        );
                        dispatch(
                            setLoginSuccess({
                                status: true,
                                token: token.jwt,
                                user: data,
                            }),
                        );
                    } else {
                        navigation.navigate(Screen.Auth);
                    }
                },
            );
        }
    }, []);
    const [showLogout, setShowLogout] = useState(false);
    const logoutButton = () => (
        <>
            <CQuestionModel
                isVisible={showLogout}
                title={'Đăng xuất'}
                message={'Bạn có chắc muốn đăng xuất không?'}
                onClick={value => {
                    setShowLogout(false);
                    if (value) {
                        dispatch(logout());
                        navigation.replace(Screen.Auth);
                    }
                }}
            />
            <TouchableOpacity
                style={{
                    marginHorizontal: 20,
                }}
                onPress={() => {
                    setShowLogout(true);
                }}>
                <Image source={require('../../../image/logout.png')} />
            </TouchableOpacity>
        </>
    );
    const backButton = (isSetName = false) => (
        <>
            <TouchableOpacity
                style={{
                    marginHorizontal: 20,
                }}
                onPress={() => {
                    if (isSetName) dispatch(setRegisterName(null));
                    navigation.goBack();
                }}>
                <Image
                    style={{
                        height: 30,
                        width: 30,
                    }}
                    source={require('../../../image/iconArrowLeftWhite.png')}
                />
            </TouchableOpacity>
        </>
    );
    const headerTitle = (text: string, showHello: boolean = false) => (
        <View
            style={{
                marginHorizontal: 10,
            }}>
            {showHello ? (
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: 'white',
                    }}>
                    {'Xin chào,'}
                </Text>
            ) : null}
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: 'white',
                }}>
                {text}
            </Text>
        </View>
    );
    return (
        <Stack.Navigator initialRouteName={Screen.StackScreen.HomeScreen}>
            <Stack.Screen
                name={Screen.StackScreen.HomeScreen}
                component={HomeScreen}
                options={{
                    headerRight: logoutButton,
                    headerStyle: {
                        backgroundColor: '#329BF0', //Set Header color
                        height: 80,
                    },
                    headerTitle: () => headerTitle(user?.firstname ?? '', true),
                }}
            />
            <Stack.Screen
                name={Screen.StackScreen.RegisterFaceScreen}
                component={RegisterFaceScreen}
                options={{
                    headerRight: logoutButton,
                    headerLeft: () => backButton(),
                    headerStyle: {
                        backgroundColor: '#329BF0', //Set Header color
                        height: 80,
                    },
                    headerTitle: () => headerTitle('Đăng ký điểm danh'),
                }}
            />
            <Stack.Screen
                name={Screen.StackScreen.FrontFaceScreen}
                component={FrontFaceScreen}
                options={{
                    headerRight: logoutButton,
                    headerLeft: () => backButton(true),
                    headerStyle: {
                        backgroundColor: '#329BF0', //Set Header color
                        height: 80,
                    },
                    headerTitle: () => headerTitle('Đăng ký điểm danh'),
                }}
            />
            <Stack.Screen
                name={Screen.StackScreen.SuccessfullRegisterScreen}
                component={SuccessfullRegisterScreen}
                options={{
                    headerRight: logoutButton,
                    headerLeft: () => backButton(),
                    headerStyle: {
                        backgroundColor: '#329BF0', //Set Header color
                        height: 80,
                    },
                    headerTitle: () => headerTitle('Đăng ký điểm danh'),
                }}
            />
            <Stack.Screen
                name={Screen.StackScreen.AttendanceScreen}
                component={AttendanceScreen}
                options={{
                    headerRight: logoutButton,
                    headerLeft: () => backButton(),
                    headerStyle: {
                        backgroundColor: '#329BF0', //Set Header color
                        height: 80,
                    },
                    headerTitle: () => headerTitle('Điểm danh'),
                }}
            />
        </Stack.Navigator>
    );
};

export default HomeScreenStack;
