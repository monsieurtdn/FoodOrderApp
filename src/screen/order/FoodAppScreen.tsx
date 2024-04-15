import { useWindowHook } from 'hooks/useWindowHook';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CancelButton } from './components/Buttons';
import FoodOrderQRScan from './components/FoodOrderQRScan';
import { TableData } from './components/TableData';
interface IQrScanScreen {
    navigation: any;
}
export const FoodAppScreen: React.FC<IQrScanScreen> = props => {
    const { navigation } = props;
    const { SCREEN_ORIENTATION, orientation } = useWindowHook();
    let role = 'waiter';
    if (role === 'waiter') {
        return (
            <SafeAreaView>
                <TableData />
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView
            style={[
                styles.scanContainer,
                orientation === SCREEN_ORIENTATION.LANDSCAPE
                    ? styles.scanContainer_landscape
                    : {},
            ]}>
            <View>
                <FoodOrderQRScan navigation={navigation} />
            </View>
            <View style={styles.cameraFrame}>
                <View style={{ position: 'absolute', top: 10, right: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <CancelButton />
                    </TouchableOpacity>
                </View>
                <View
                    style={
                        orientation === SCREEN_ORIENTATION.LANDSCAPE
                            ? styles.cameraFrame_Inner_landscape
                            : styles.cameraFrame_Inner
                    }
                />
                <Text style={styles.cameraFrame_InnerText}>
                    {'Scan the QR Code to open the App'}
                </Text>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    scanContainer: {
        // paddingVertical: 8,
        // paddingHorizontal: 6,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
        // gap: 10,
        backgroundColor: 'white',
    },
    scanContainer_landscape: {
        flexDirection: 'row',
        width: '100%',
    },
    cameraFrame: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 35,
        paddingHorizontal: 10,
    },
    cameraFrame_Inner: {
        width: 300,
        height: 220,
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cameraFrame_Inner_landscape: {
        width: 400,
        height: 220,
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    cameraFrame_InnerText: {
        color: 'white',
        transform: [{ translateY: -10 }],
        paddingTop: 15,
    },
    cameraContainer_landscape: {
        flex: 1,
        // borderRadius: 12,
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
    },
});
