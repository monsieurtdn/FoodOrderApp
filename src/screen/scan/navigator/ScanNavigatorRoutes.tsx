// Import React
import React, { useEffect } from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import Utils from 'common/Utils';
import { Screen } from 'common/screenEnums';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { IdentificationInfor } from 'screen/scan/IdentificationInfor';
import IdentificationScan from 'screen/scan/IdentificationScan';
import QrScan from 'screen/scan/QrScan';
import { IdentificationSubmitResult } from '../IdentificationSubmitResult';
import { SelectScanType } from '../SelectScanType';

interface IScanScreenStack {
    navigation: any;
}

const Stack = createStackNavigator();

export const ScanScreenStack: React.FC<IScanScreenStack> = props => {
    const { navigation } = props;
    // const dispatch = useDispatch();
    useEffect(() => {
        if (!Utils.token) {
            // Utils.getValueLocalStorage(Utils.constant.token).then(
            //     async (token: ResponseToken) => {
            //         if (token != null) {
            //             var data = await Utils.getValueLocalStorage(
            //                 Utils.constant.user,
            //             );
            //             dispatch(
            //                 setLoginSuccess({
            //                     status: true,
            //                     token: token.jwt,
            //                     user: data,
            //                 }),
            //             );
            //         } else {
            //             navigation.navigate(Screen.Auth);
            //         }
            //     },
            // );
        }
    }, []);

    const backButton = (backTo?: string, icon: string = 'arrow-left') => (
        <IconButton
            icon={icon}
            iconColor={'#FFFFFF'}
            size={25}
            onPress={() => {
                if (backTo) {
                    navigation.navigate(backTo);
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
        <Stack.Navigator initialRouteName={Screen.ScanScreen.SelectType}>
            <Stack.Screen
                name={Screen.ScanScreen.SelectType}
                component={SelectScanType}
                options={{
                    headerLeft: () => backButton(),
                    headerStyle: {
                        backgroundColor: '#005BA5',
                    },
                    headerTitle: () => headerTitle('Scan định danh'),
                }}
            />
            <Stack.Screen
                name={Screen.ScanScreen.qrScan}
                component={QrScan}
                options={{
                    headerLeft: () => backButton(Screen.ScanScreen.SelectType),
                    headerStyle: {
                        backgroundColor: '#005BA5',
                    },
                    headerTitle: () => headerTitle('Scan CCCD có chip'),
                }}
            />
            <Stack.Screen
                name={Screen.ScanScreen.IdentificationScan}
                component={IdentificationScan}
                options={{
                    headerLeft: () => backButton(Screen.ScanScreen.SelectType),
                    headerStyle: {
                        backgroundColor: '#005BA5',
                    },
                    headerTitle: () => headerTitle('Scan định danh'),
                }}
            />
            <Stack.Screen
                name={Screen.ScanScreen.IdentificationInfor}
                component={IdentificationInfor}
                options={{
                    headerLeft: () => backButton(undefined, 'close'),
                    headerStyle: {
                        backgroundColor: '#005BA5',
                    },
                    headerTitle: () => headerTitle('Thông tin định danh'),
                }}
            />
            <Stack.Screen
                name={Screen.ScanScreen.IdentificationSubmitResult}
                component={IdentificationSubmitResult}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default ScanScreenStack;
