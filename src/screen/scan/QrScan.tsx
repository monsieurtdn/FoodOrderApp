import { useWindowHook } from 'hooks/useWindowHook';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import QRScanning from '../../components/QRScanning';
interface IQrScanScreen {
    navigation: any;
}
const QrScan: React.FC<IQrScanScreen> = props => {
    const { navigation } = props;
    const { SCREEN_ORIENTATION, orientation } = useWindowHook();
    return (
        <SafeAreaView
            style={[
                styles.scanContainer,
                orientation === SCREEN_ORIENTATION.LANDSCAPE
                    ? styles.scanContainer_landscape
                    : {},
            ]}>
            <View>
                <QRScanning navigation={navigation} />
            </View>
            <View style={styles.cameraFrame}>
                <View
                    style={
                        orientation === SCREEN_ORIENTATION.LANDSCAPE
                            ? styles.cameraFrame_Inner_landscape
                            : styles.cameraFrame_Inner
                    }>
                    <Text style={styles.cameraFrame_InnerText}>
                        {'Đưa CCCD vào khung hình'}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    scanContainer: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'relative',
        gap: 10,
        backgroundColor: 'white',
    },
    scanContainer_landscape: {
        flexDirection: 'row',
        width: '100%',
    },
    headerLeftStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerTextStyle: {
        fontWeight: '700',
        fontSize: 20,
        color: '#FFFFFF',
    },
    cameraContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
    },
    cameraFrame: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 35,
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
    },
    cameraContainer_landscape: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
    },
});
export default QrScan;
