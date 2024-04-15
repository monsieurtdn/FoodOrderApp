import { createStackNavigator } from '@react-navigation/stack';
import { Screen } from 'common/screenEnums';
import React from 'react';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
// import ProfileScreen from '../ProfileScreen';
import { EditProfileScreen } from '../EditProfileScreen';

interface IProfileNavigatorRoutes {
    navigation: any;
}

const Stack = createStackNavigator();

export const ProfileNavigatorRoutes: React.FC<
    IProfileNavigatorRoutes
> = props => {
    const { navigation } = props;
    const backButton = (
        backTo?: string,
        icon: string = 'arrow-left',
        screen?: string,
    ) => (
        <IconButton
            icon={icon}
            iconColor={'#FFFFFF'}
            size={25}
            onPress={() => {
                if (backTo) {
                    navigation.navigate(backTo, { screen });
                } else {
                    navigation.goBack();
                }
            }}
        />
    );
    const headerTitle = (text: string, showHello: boolean = false) => (
        <View
            style={{
                marginHorizontal: 0,
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
                    fontSize: 20,
                    fontWeight: '600',
                    color: 'white',
                }}>
                {text}
            </Text>
        </View>
    );
    return (
        <Stack.Navigator initialRouteName={Screen.ProfileScreen.editProfile}>
            {/* <Stack.Screen
                name={Screen.ProfileScreen.profile}
                component={ProfileScreen}
                options={{
                    headerStyle: {
                        //Set Header color
                        height: 57,
                    },
                    headerLeft: () => (
                        <IconButton
                            icon={'arrow-left'}
                            iconColor="black"
                            onPress={() =>
                                navigation.navigate(Screen.TabScreen.name, {
                                    screen: Screen.TabScreen.homeScreen,
                                })
                            }
                        />
                    ),
                    headerTitle: () => (
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>
                            Menu
                        </Text>
                    ),
                }}
            /> */}
            <Stack.Screen
                name={Screen.ProfileScreen.editProfile}
                component={EditProfileScreen}
                options={{
                    headerLeft: () =>
                        backButton(
                            Screen.TabScreen.name,
                            undefined,
                            Screen.ProfileScreen.profile,
                        ),
                    headerStyle: {
                        backgroundColor: '#005BA5',
                    },
                    // headerTitle: () => headerTitle('Chỉnh sửa tài khoản'),
                    headerTitle: () => headerTitle('Thông tin tài khoản'),
                }}
            />
        </Stack.Navigator>
    );
};
