/* eslint-disable @typescript-eslint/no-unused-vars */
import { BottomTabNavigationHelpers } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import HotelNightAuditApi from 'api/hotel/nightaudit.api';
import Utils from 'common/Utils';
import { Screen } from 'common/screenEnums';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { SceneMap } from 'react-native-tab-view';
import { useDispatch } from 'react-redux';
import { setBusinessDate } from 'store/controls/HomeEpic';
import { useSelectorRoot } from 'store/store';
import Cashier from './components/Cashier';
import Revenue from './components/Revenue';

const renderScene = SceneMap({
    revenue: Revenue,
    cashier: Cashier,
});

const HomeScreen = (props: { navigation: BottomTabNavigationHelpers }) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    // store.getState().persist.
    const tokenn = useSelectorRoot(state => state.persist.token);
    const { seletedOperation } = useSelectorRoot(state => state.home);

    const [editedOCName, setEditedOCName] = useState<string>('');
    const currentDateString = useSelectorRoot(state => state.home.businessDate);

    // console.log(tokenn, 'token ở home screen');
    // console.log(seletedCompany, 'seletedCompany');

    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {
            key: 'revenue',
            title: 'END OF DAY & REVENUE',
        },
        { key: 'cashier', title: 'FRONT DESK & CASHIER' },
    ]);

    const options = [
        // {
        //     icon: 'desk',
        //     navigate: () => {
        //         navigation.navigate(Screen.TabScreen.jobScreen);
        //         console.log('chuyển đến màn hình front desk');
        //     },
        //     label: 'HR',
        // },
        // {
        //     icon: 'account-multiple-check',
        //     navigate: () => {
        //         navigation.navigate(Screen.TabScreen.jobScreen);
        //     },
        //     label: 'Điểm danh',
        // },
        // {
        //     icon: 'account-plus-outline',
        //     navigate: () => {
        //         navigation.navigate(Screen.TabScreen.faceRegisterScreen);
        //     },
        //     label: 'Đăng ký Face',
        // },
        {
            icon: 'line-scan',
            navigate: () => {
                navigation.navigate(Screen.ScanScreen.name);
            },
            label: 'Scan',
        },
        {
            icon: 'baguette',
            navigate: () => {
                navigation.navigate(Screen.OrderScreen.name);
            },
            label: 'Food Order',
        },
        {
            icon: 'broom',
            navigate: () => {
                if (
                    !currentDateString ||
                    currentDateString === '' ||
                    !moment(currentDateString).isValid()
                ) {
                    return;
                }
                navigation.navigate(Screen.HotelScreen.name);
            },
            label: 'Housekeeping',
        },
    ];

    useEffect(() => {
        let ocName = '';
        if (seletedOperation) {
            let selectedOCName = seletedOperation.name;
            if (selectedOCName?.length) {
                if (selectedOCName?.length > 14) {
                    ocName = selectedOCName.slice(0, 14) + '...';
                } else {
                    ocName = selectedOCName;
                }
            }
        }
        setEditedOCName(ocName);

        HotelNightAuditApi.getBusinessDate().subscribe(
            res => {
                if (res) {
                    dispatch(setBusinessDate(res));
                }
            },
            err => {
                console.log(err);
                dispatch(setBusinessDate(moment.utc().toISOString()));
            },
        );
    }, [seletedOperation]);

    return (
        <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContentHeadAndBody}>
                <ImageBackground
                    source={require('../../../../image/cover.png')}
                    style={styles.backgroundImage}>
                    <View
                        style={{
                            width: '100%',
                            height: 200,
                            justifyContent: 'center',
                            backgroundColor:
                                'linear-gradient(90deg, rgba(0,0,0,0.47522759103641454) 0%, rgba(0,0,0,1) 100%)',
                        }}
                    />
                </ImageBackground>
                <View style={styles.container}>
                    <View style={styles.headerLeftStyle}>
                        <IconButton
                            style={{
                                backgroundColor: '#FFFFFF',
                            }}
                            icon={'arrow-left'}
                            iconColor={'#000000'}
                            size={25}
                            onPress={() => {
                                navigation.navigate(Screen.MainScreen);
                            }}
                        />
                        <Text style={styles.headerTextStyle}>
                            {editedOCName}
                        </Text>
                    </View>
                    <View style={{ marginLeft: 75 }}>
                        <Text style={{ color: '#FFFFFF' }}>
                            Business date:{' '}
                            {moment(currentDateString).isValid() &&
                                moment(currentDateString).format(
                                    Utils.dateFormat,
                                )}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        alignSelf: 'flex-end',
                        width: '100%',
                        height: '100%',
                        paddingTop: 115,
                        zIndex: 1,
                    }}>
                    <View
                        style={{
                            flex: 1,
                            flexWrap: 'wrap',
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#FFFFFF',
                            paddingTop: 10,
                            borderTopRightRadius: 12,
                            borderTopLeftRadius: 12,
                            flexDirection: 'row',
                        }}>
                        {options.map((option, indexx) => {
                            return (
                                <View
                                    key={indexx}
                                    style={{
                                        width: '33.3333%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginVertical: 5,
                                    }}>
                                    <IconButton
                                        style={{
                                            backgroundColor:
                                                'rgba(9, 109, 217, 1)',
                                        }}
                                        icon={option.icon}
                                        iconColor={'#FFFFFF'}
                                        size={40}
                                        onPress={option.navigate}
                                    />
                                    <Text style={styles.buttonTextStyle}>
                                        {option.label}
                                    </Text>
                                </View>
                            );
                        })}
                        {/* <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={{ width: layout.width }}
                            lazy
                            renderLazyPlaceholder={() => <ActivityIndicator />}
                            renderTabBar={propss => (
                                <TabBar
                                    {...propss}
                                    indicatorStyle={{
                                        backgroundColor: '#006CE4',
                                    }}
                                    style={{ backgroundColor: '#FFFFFF' }}
                                    renderLabel={({ route, focused }) => (
                                        <Text
                                            style={{
                                                color: focused
                                                    ? '#006CE4'
                                                    : '#1A1A1A',
                                            }}>
                                            {route.title}
                                        </Text>
                                    )}
                                    renderTabBarItem={itemProps => (
                                        <TabBarItem
                                            {...itemProps}
                                            style={styles.tabBarItem}
                                        />
                                    )}
                                />
                            )}
                        /> */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        position: 'relative',
    },
    mainView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 15,
    },
    modalContentHeadAndBody: {
        flex: 1,
        width: '100%',
        position: 'relative',
    },
    modalContentHead: {
        width: '100%',
        backgroundColor: '#005BA5', //Set Header color
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeftStyle: {
        width: '100%',
        display: 'flex',
        // flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    headerTextStyle: {
        fontWeight: '700',
        fontSize: 30,
        color: '#FFFFFF',
    },
    button: {
        borderRadius: 30,
        width: '100%',
        height: 45,
        color: '#FFFFFF',
        backgroundColor: '#005BA5',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        // fontWeight: '500'
    },
    footerStyle: {
        borderRadius: 5,
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    backgroundImage: {
        // flex: 1,
        width: '100%',
        height: 200,
        resizeMode: 'contain', // Để hình nền căn vừa với kích thước của view
        justifyContent: 'center',
    },
    container: {
        position: 'absolute',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        zIndex: 2,
    },
    tabBarItem: {
        flexDirection: 'row',
        gap: 10,
    },
    buttonTextStyle: {
        fontSize: 13,
        color: '#005BA5',
    },
});

export default HomeScreen;
