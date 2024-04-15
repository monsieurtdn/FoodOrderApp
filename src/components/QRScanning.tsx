import { IScanInfor } from 'common/define-types';
import { Screen } from 'common/screenEnums';
import { useWindowHook } from 'hooks/useWindowHook';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { Button } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { setScanInfor } from 'store/slice/ScanSlice';
import { useDispatchRoot } from 'store/store';
interface QRScannerScreenProps {
    navigation: any;
}

const QRScannerScreen: React.FC<QRScannerScreenProps> = props => {
    const { SCREEN_ORIENTATION, orientation } = useWindowHook();
    const { navigation } = props;
    const [scanInfo, setScanInfo] = useState<IScanInfor | null>(null);
    const [renderScanner, setRenderScanner] = useState(true);
    const [result, setResult] = useState('');
    const dispatch = useDispatchRoot();
    function onSuccess(e: BarCodeReadEvent): void {
        setRenderScanner(false);
        console.log(e);
        const infoArray = e.data?.split('|');
        if (infoArray != null && infoArray.length > 6) {
            setScanInfo({
                no_cccd: infoArray[0],
                // old_id: infoArray[1],
                full_name: infoArray[2],
                birth_Date: infoArray[3].replace(
                    /(\d{2})(\d{2})(\d{4})/,
                    '$1/$2/$3',
                ),
                sex: infoArray[4],
                que_quan: infoArray[5],
                exp_Date: infoArray[6].replace(
                    /(\d{2})(\d{2})(\d{4})/,
                    '$1/$2/$3',
                ),
            });
        } else {
            setResult(e.data ?? e.rawData);
        }
    }

    useEffect(() => {
        if (scanInfo) {
            dispatch(setScanInfor(scanInfo));
            navigation.navigate(Screen.ScanScreen.IdentificationInfor);
        }
    }, [scanInfo]);

    return (
        <View
            style={[
                orientation === SCREEN_ORIENTATION.LANDSCAPE
                    ? styles.cameraContainer_landscape
                    : styles.cameraContainer,
                { position: 'relative' },
            ]}>
            {renderScanner ? (
                <QRCodeScanner
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    cameraStyle={{ height: '100%', width: '100%' }}
                />
            ) : (
                <>
                    <View style={styles.header}>
                        <Image
                            source={require('../../image/success.png')}
                            style={{ height: 50, width: 50, marginTop: 20 }}
                        />
                        <Text style={styles.textBold}>
                            Quét thông tin thành công!
                        </Text>
                    </View>
                    {scanInfo ? (
                        <View style={{ marginLeft: 15, marginTop: 10 }}>
                            {/* <Text>Số CCCD: {scanInfo?.id}</Text>
                            <Text>Số CMND cũ: {scanInfo?.old_id}</Text>
                            <Text>Họ và tên: {scanInfo?.name}</Text>
                            <Text>Ngày sinh: {scanInfo?.date}</Text>
                            <Text>Giới tính: {scanInfo?.gender}</Text>
                            <Text>Địa chỉ thường trú: {scanInfo?.address}</Text>
                            <Text>
                                Ngày đăng ký CCCD: {scanInfo?.registeredDate}
                            </Text> */}
                        </View>
                    ) : (
                        <View>
                            <Text>{result}</Text>
                        </View>
                    )}

                    <Button
                        buttonColor="red"
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Text style={styles.buttonText}>Quay lại</Text>
                    </Button>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
    },
    cameraContainer_landscape: {
        width: '200%',
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
    },
    container: {
        flex: 1,
        position: 'relative',
    },
    centerText: {
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        fontSize: 24,
        color: '#000',
    },
    buttonText: {
        fontSize: 18,
        color: '#000',
    },
    buttonTouchable: {
        padding: 16,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        marginHorizontal: 16,
    },
});

export default QRScannerScreen;
