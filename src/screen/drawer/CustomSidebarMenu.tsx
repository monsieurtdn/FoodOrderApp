import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {logout} from 'store/controls/LoginEpic';
import CQuestionModel from 'components/model/CQuestionModel';
import {useSelectorRoot} from 'store/store';
import {TouchableOpacity} from 'react-native-gesture-handler';

const CustomSidebarMenu = (props: DrawerContentComponentProps) => {
    const dispatch = useDispatch();
    const [showLogout, setShowLogout] = useState(false);
    const {profile} = useSelectorRoot(state => state.login);
    const [profileData, setProfile] = useState(profile);
    useEffect(() => {
        setProfile(profile);
    }, [profile]);
    return (
        <View style={stylesSidebar.sideMenuContainer}>
            <CQuestionModel
                isVisible={showLogout}
                title={'Đăng xuất'}
                message={'Bạn có chắc muốn đăng xuất không?'}
                onClick={value => {
                    setShowLogout(false);
                    if (value) {
                        dispatch(logout());
                        props.navigation.navigate('Auth');
                    }
                }}
            />
            <View style={stylesSidebar.profileHeader}>
                <View style={stylesSidebar.profileHeaderPicCircle}>
                    <Text style={{fontSize: 25, color: 'black'}}>
                        {profileData?.username?.charAt(0) ?? (
                            <Image
                                source={require('../../../image/user.png')}
                            />
                        )}
                    </Text>
                </View>
                <Text style={stylesSidebar.profileHeaderText}>
                    {profileData?.username ?? 'Vô danh'}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.closeDrawer();
                        setShowLogout(true);
                    }}>
                    <Image source={require('../../../image/logout.png')} />
                </TouchableOpacity>
            </View>
            <View style={stylesSidebar.profileHeaderLine} />

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        paddingTop: 40,
        color: '#1C2E4509',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#193B6708',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: '#192434',
        backgroundColor: '#193B6750',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileHeaderText: {
        color: '#192434',
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        flexGrow: 1,
    },
    profileHeaderLine: {
        height: 1,
        marginHorizontal: 20,
        backgroundColor: '#ffffff',
        marginTop: 15,
    },
});
