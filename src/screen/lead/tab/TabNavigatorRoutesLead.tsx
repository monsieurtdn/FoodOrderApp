/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screen } from 'common/screenEnums';
import CQuestionModel from 'components/model/CQuestionModel';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { BackHandler, Image, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setRegisterName } from 'store/controls/Camera.slice';
import { logout } from 'store/controls/LoginEpic';
import { useSelectorRoot } from 'store/store';
// import { ProfileNavigatorRoutes } from '../profile/navigator/ProfileNavigatorRoutes';
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import MainScreen from '../main/MainScreen';
import ProfileScreen from '../profile/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../home/HomeScreen';

interface ITabNavigatorRoutesLead {
    navigation: any;
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStackScreen = () => {
    // Stack Navigator for Login and Sign up Screen
    return (
        <Stack.Navigator initialRouteName={Screen.TabScreen.mainScreen}>
            <Stack.Screen
                name={Screen.TabScreen.mainScreen}
                component={MainScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Screen.TabScreen.homeScreen}
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const TabNavigatorRoutesLead: React.FC<ITabNavigatorRoutesLead> = props => {
    const { navigation } = props;
    const dispatch = useDispatch();
    const [showLogout, setShowLogout] = useState(false);
    const { user } = useSelectorRoot(x => x.login);
    const { token } = useSelectorRoot(state => state.persist);

    const [isClickedMenu, setIsClickedMenu] = useState(false);

    console.log(token, 'token ở Tab');

    // DeviceEventEmitter.addListener('unauthenticate.event', (value: boolean) => {
    //     if (value) {
    //         navigation.navigate('Auth');
    //     }
    // });

    // useEffect(() => {
    //     if (token != null) {
    //         let data = userData;
    //         if (data) {
    //             dispatch(
    //                 setLoginSuccess({
    //                     status: true,
    //                     token: token,
    //                     user: data,
    //                 }),
    //             );
    //         }
    //     } else {
    //         navigation.navigate('Auth');
    //     }
    // }, []);

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
                        navigation.navigate(Screen.Auth);
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
                <Image source={require('../../../../image/logout.png')} />
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
                    if (isSetName) {
                        dispatch(setRegisterName(null));
                    }
                    navigation.goBack();
                }}>
                <Image
                    style={{
                        height: 30,
                        width: 30,
                    }}
                    source={require('../../../../image/iconArrowLeftWhite.png')}
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

    function EmptyScreen() {
        return null; // Màn hình rỗng
    }

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
        setIsClickedMenu(index === 1 ? true : false);
    }, []);

    const options = [
        // {
        //     icon: 'desk',
        //     navigate: () => {
        //         // navigation.navigate(Screen.TabScreen.jobScreen);
        //         console.log('chuyển đến màn hình front desk');
        //     },
        //     label: 'Front desk',
        // },
        // {
        //     icon: 'line-scan',
        //     navigate: () => {
        //         navigation.navigate(Screen.ScanScreen.name);
        //     },
        //     label: 'Scan',
        // },
        // {
        //     icon: 'broom',
        //     navigate: () => {
        //         navigation.navigate(Screen.HotelScreen.name);
        //     },
        //     label: 'House keeping',
        // },
        {
            icon: 'account-multiple-check',
            navigate: () => {
                navigation.navigate(Screen.TabScreen.jobScreen);
            },
            label: 'Điểm danh',
        },
        {
            icon: 'account-plus-outline',
            navigate: () => {
                navigation.navigate(Screen.TabScreen.faceRegisterScreen);
            },
            label: 'Đăng ký Face',
        },
    ];

    return (
        <BottomSheetModalProvider>
            <Tab.Navigator
                initialRouteName="MainStackScreen"
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#005BA5',
                        height: '11%',
                        padding: 10,
                        // paddingHorizontal: 30,
                    },
                }}>
                <Tab.Screen
                    name="MainStackScreen"
                    component={MainStackScreen}
                    options={{
                        headerShown: false,
                        headerRight: logoutButton,
                        headerLeft: () => backButton(),
                        headerStyle: {
                            // backgroundColor: tourById ? '#005BA5' : '#f2f2f2', //Set Header color
                            // height: 70,
                        },
                        headerTitle: () =>
                            headerTitle(user?.firstname ?? '', true),
                        headerTitleAlign: 'center',
                        tabBarLabel: ({ focused }) => {
                            return (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            color: focused
                                                ? '#FFFFFF'
                                                : '#7aa8cd',
                                            fontSize: 14,
                                            fontWeight: focused ? '600' : '400',
                                        }}>
                                        {'Home'}
                                    </Text>
                                </View>
                            );
                        },
                        tabBarIcon: ({ focused }) => {
                            return (
                                <IconButton
                                    icon={'home-outline'}
                                    iconColor={focused ? '#FFFFFF' : '#7aa8cd'}
                                    size={30}
                                />
                            );
                        },
                    }}
                />
                {/* <Tab.Screen
                    name={'ActionBottom'}
                    component={EmptyScreen}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow
                    listeners={({ navigation, route }) => ({
                        tabPress: e => {
                            e.preventDefault(); // Ngăn chặn hành động chuyển màn hình mặc định
                        },
                    })}
                    options={{
                        tabBarLabel: '',
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        tabBarIcon: ({ focused }) => {
                            return (
                                <>
                                    <IconButton
                                        style={{
                                            marginBottom: 75,
                                            backgroundColor:
                                                'rgba(9, 109, 217, 1)',
                                            borderWidth: 2,
                                            borderColor: '#FFFFFF',
                                        }}
                                        icon={isClickedMenu ? 'close' : 'menu'}
                                        iconColor={'#FFFFFF'}
                                        size={40}
                                        onPress={() => {
                                            handlePresentModalPress();
                                        }}
                                    />
                                    <BottomSheetModal
                                        ref={bottomSheetModalRef}
                                        index={1}
                                        snapPoints={snapPoints}
                                        backdropComponent={propss => (
                                            <BottomSheetBackdrop
                                                {...propss}
                                                enableTouchThrough={true}
                                                opacity={0.7}
                                            />
                                        )}
                                        onChange={handleSheetChanges}>
                                        <BottomSheetScrollView
                                            style={{
                                                flex: 1,
                                            }}>
                                            <View
                                                style={styles.buttonViewStyle}>
                                                {options.map(
                                                    (option, index) => {
                                                        return (
                                                            <View
                                                                key={index}
                                                                style={{
                                                                    width: '33.3333%',
                                                                    display:
                                                                        'flex',
                                                                    flexDirection:
                                                                        'column',
                                                                    justifyContent:
                                                                        'flex-start',
                                                                    alignItems:
                                                                        'center',
                                                                    marginVertical: 5,
                                                                }}>
                                                                <IconButton
                                                                    style={{
                                                                        backgroundColor:
                                                                            'rgba(9, 109, 217, 1)',
                                                                    }}
                                                                    icon={
                                                                        option.icon
                                                                    }
                                                                    iconColor={
                                                                        '#FFFFFF'
                                                                    }
                                                                    size={40}
                                                                    onPress={
                                                                        option.navigate
                                                                    }
                                                                />
                                                                <Text
                                                                    style={
                                                                        styles.buttonTextStyle
                                                                    }>
                                                                    {
                                                                        option.label
                                                                    }
                                                                </Text>
                                                            </View>
                                                        );
                                                    },
                                                )}
                                            </View>
                                        </BottomSheetScrollView>
                                    </BottomSheetModal>
                                </>
                            );
                        },
                    }}
                /> */}
                <Tab.Screen
                    name={Screen.ProfileScreen.profile}
                    component={ProfileScreen}
                    options={{
                        // tabBarStyle: { display: 'none' },
                        headerShown: false,
                        tabBarLabel: ({ focused }) => {
                            return (
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            color: focused
                                                ? '#FFFFFF'
                                                : '#7aa8cd',
                                            fontSize: 14,
                                            fontWeight: focused ? '600' : '400',
                                        }}>
                                        {'Tài khoản'}
                                    </Text>
                                </View>
                            );
                        },
                        tabBarIcon: ({ focused }) => {
                            return (
                                <IconButton
                                    icon={'account-circle-outline'}
                                    iconColor={focused ? '#FFFFFF' : '#7aa8cd'}
                                    size={30}
                                />
                            );
                        },
                    }}
                />
            </Tab.Navigator>
        </BottomSheetModalProvider>
    );
};

export default TabNavigatorRoutesLead;

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    buttonViewStyle: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    buttonTextStyle: {
        fontSize: 13,
        color: '#005BA5',
    },
});
