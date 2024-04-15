import { Screen } from 'common/screenEnums';
import { useWindowHook } from 'hooks/useWindowHook';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { Modal, Portal } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { DeleteButton } from './Buttons';
interface QRScannerScreenProps {
    navigation: any;
}

const FoodOrderQRScan: React.FC<QRScannerScreenProps> = props => {
    const { SCREEN_ORIENTATION, orientation } = useWindowHook();
    const { navigation } = props;
    const [scanInfo, setScanInfo] = useState('');
    const [visible, setVisible] = useState<boolean>(false);
    function onSuccess(e: BarCodeReadEvent): void {
        console.log(e);
        setScanInfo(e.data);
    }
    useEffect(() => {
        if (scanInfo) {
            setVisible(true);
            console.log(scanInfo);
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
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.auto}
                cameraStyle={{ height: '100%', width: '100%' }}
            />
            {visible && (
                <Portal>
                    <Modal
                        visible={true}
                        contentContainerStyle={{
                            backgroundColor: 'white',
                            padding: 20,
                            width: 300,
                            margin: '8%',
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                            Proceed?
                        </Text>
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 10, right: 10 }}
                            onPress={() => {
                                setVisible(false);
                            }}>
                            <DeleteButton />
                        </TouchableOpacity>
                        <View>
                            <Text>Dữ liệu trả về là: {scanInfo}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#A50000',
                                    gap: 10,
                                    borderRadius: 100,
                                    marginLeft: 60,
                                    paddingHorizontal: 20,
                                    height: 39,
                                }}
                                activeOpacity={0.7}
                                onPress={() => {
                                    setVisible(false);
                                }}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#005BA5',
                                    gap: 10,
                                    borderRadius: 100,
                                    marginLeft: 20,
                                    paddingHorizontal: 10,
                                    height: 39,
                                }}
                                activeOpacity={0.7}
                                onPress={() => {
                                    setVisible(false);
                                    navigation.navigate(
                                        Screen.OrderScreen.WelcomeScreen,
                                    );
                                }}>
                                <Text style={styles.buttonText}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </Portal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cameraContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        // borderRadius: 12,
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
    },
    cameraContainer_landscape: {
        width: '200%',
        flex: 1,
        // borderRadius: 12,
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
        color: '#fff',
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

export default FoodOrderQRScan;
