import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Image,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import {
    Asset,
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker';
import { Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AndroidPermissionEnum } from 'types';

interface IRequestPermission {
    permission: string;
    cameraType?: string;
    onChangeImage: (value: Asset) => void;
    title?: string;
    saveToPhotos?: boolean;
    width?: number | string;
    height?: number | string;
    src?: Asset;
}

const RequestPermission: React.FC<IRequestPermission> = ({
    permission,
    onChangeImage,
    cameraType,
    title,
    saveToPhotos,
    width,
    height,
    src,
}: IRequestPermission) => {
    const [visibleFilePopup, setVisibleFilePopup] = useState(false);
    const [visible, setVisible] = useState(false);
    const [resourcePath, setResourcePath] = useState<Asset | undefined>(src);
    const camera = useRef<any>(null);
    const [mode, setMode] = useState(CameraType.Front);
    useEffect(() => {
        setResourcePath(src);
    }, [src]);
    const requestCameraPermission = async () => {
        if (Platform.OS === 'ios') {
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Access Required',
                        message: 'This App needs to Access your camera',
                        buttonPositive: 'Mở cài đặt',
                    },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const requestGalaryPermission = async () => {
        if (Platform.OS === 'ios') {
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    {
                        title: 'Image Access Required',
                        message: 'This App needs to Access your galary',
                        buttonPositive: 'Mở cài đặt',
                    },
                );
                const grantedEx = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Image Access Required',
                        message: 'This App needs to Access your galary',
                        buttonPositive: 'Mở cài đặt',
                    },
                );
                return (
                    granted === PermissionsAndroid.RESULTS.GRANTED &&
                    grantedEx === PermissionsAndroid.RESULTS.GRANTED
                );
            } catch (err) {
                console.warn(err);
            }
        }
    };
    const selectFileFromCamera = async () => {
        var result = await requestCameraPermission();
        console.log(result);
        // if (result == false) {
        //     return;
        // }
        launchCamera(
            {
                cameraType: cameraType ? (cameraType as CameraType) : 'front',
                mediaType: 'photo',
                saveToPhotos: saveToPhotos ? saveToPhotos : false,
            },
            res => {
                if (res.didCancel) {
                    console.log('User cancelled image picker');
                } else if (res.errorCode) {
                    console.log('ImagePicker Error: ', res.errorMessage);
                } else if (res.assets) {
                    setResourcePath(res.assets[0]);
                    onChangeImage(res.assets[0]);
                }
            },
        );
    };
    const selectFileFromGalary = async () => {
        var result = await requestGalaryPermission();
        console.log(result);
        // if (result == false) {
        //     return;
        // }
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: true,
            },
            res => {
                if (res.didCancel) {
                    console.log('User cancelled image picker');
                } else if (res.errorCode) {
                    console.log('ImagePicker Error: ', res.errorMessage);
                } else if (res.assets) {
                    setResourcePath(res.assets[0]);
                    onChangeImage(res.assets[0]);
                }
            },
        );
    };

    const onBottomButtonPressed = (event: any) => {
        const images = JSON.stringify(event.captureImages);
        if (event.type === 'left') {
        } else if (event.type === 'right') {
        } else {
            setResourcePath(event.captureImages);
            Alert.alert(
                event.type,
                images,
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        }
    };

    return (
        <>
            {/* <Button
                style={styles.button}
                color={'#1890FF'}
                mode="contained"
                onPress={() => {
                    setVisibleFilePopup(true);
                }}
            >
                {'Chọn hình ảnh'}
            </Button> */}
            <SafeAreaView
                style={{
                    width: width,
                    height: height,
                    borderStyle: 'dashed',
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={() => {
                        if (permission == 'custom') {
                            setVisible(true);
                        } else if (
                            permission === AndroidPermissionEnum.camera
                        ) {
                            selectFileFromCamera();
                        } else if (
                            permission === AndroidPermissionEnum.galary
                        ) {
                            selectFileFromGalary();
                        } else {
                            setVisibleFilePopup(true);
                        }
                    }}
                    activeOpacity={0.8}
                    style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {resourcePath ? (
                        <Image
                            source={{
                                uri: resourcePath.uri,
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 10,
                            }}
                        />
                    ) : (
                        <>
                            <Image
                                source={require('../../image/Camera.png')}
                                style={{
                                    width: 40,
                                    height: 40,
                                    resizeMode: 'contain',
                                    marginBottom: 5,
                                }}
                            />
                            <Text style={styles.buttonText}>
                                {' '}
                                {title ? title : 'Chụp ảnh'}
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
            </SafeAreaView>

            <Portal>
                <Modal
                    visible={visibleFilePopup}
                    onDismiss={() => setVisibleFilePopup(false)}
                    style={{ justifyContent: 'flex-end' }}>
                    {permission === AndroidPermissionEnum.camera && (
                        <View
                            style={{
                                bottom: -70,
                                padding: 20,
                                height: '45%',
                                width: '100%',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setVisibleFilePopup(false);
                                    selectFileFromCamera();
                                }}
                                style={{
                                    flex: 1,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 20,
                                    margin: 10,
                                    backgroundColor: '#F7F7F7',
                                }}>
                                <Text
                                    style={{
                                        color: '#222222',
                                        fontSize: 13,
                                        fontWeight: '600',
                                    }}>
                                    {'Máy ảnh'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {permission === AndroidPermissionEnum.galary && (
                        <View
                            style={{
                                bottom: -70,
                                padding: 20,
                                height: '45%',
                                width: '100%',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setVisibleFilePopup(false);
                                    selectFileFromGalary();
                                }}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#F7F7F7',
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 20,
                                    margin: 10,
                                }}>
                                <Text
                                    style={{
                                        color: '#222222',
                                        fontSize: 13,
                                        fontWeight: '600',
                                    }}>
                                    {'Bộ sưu tập'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    {permission === AndroidPermissionEnum.both && (
                        <View
                            style={{
                                bottom: -70,
                                padding: 20,
                                height: '60%',
                                width: '100%',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setVisibleFilePopup(false);
                                    selectFileFromCamera();
                                }}
                                style={{
                                    flex: 1,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 20,
                                    margin: 10,
                                    backgroundColor: '#F7F7F7',
                                }}>
                                <Text
                                    style={{
                                        color: '#222222',
                                        fontSize: 13,
                                        fontWeight: '600',
                                    }}>
                                    {'Máy ảnh'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setVisibleFilePopup(false);
                                    selectFileFromGalary();
                                }}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#F7F7F7',
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 20,
                                    margin: 10,
                                }}>
                                <Text
                                    style={{
                                        color: '#222222',
                                        fontSize: 13,
                                        fontWeight: '600',
                                    }}>
                                    {'Bộ sưu tập'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Modal>
                <Modal
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    style={{ justifyContent: 'flex-start' }}>
                    {/* <CameraScreen
                 style={{
                    width: "100%",
                    height: "100%"
                 }}
            // Buttons to perform action done and cancel
            // actions={{
            //   rightButtonText: 'Done',
            //   leftButtonText: 'Cancel'
            // }}
            onBottomButtonPressed={
              (event) => onBottomButtonPressed(event)
            }
            // flashImages={{
            //   // Flash button images
            //   on: require('../../image/flashOn.png'),
            //   off: require('../../image/flashOff.png'),
            //   auto: require('../../image/flashAuto.png'),
            // }}
            // cameraFlipImage={require('../../image/cameraFlipIcon.png')}
            cameraType={CameraType.Front}
            captureButtonImage={require('../../image/cameraButton.png')}
          /> */}
                    <Camera
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        ref={camera}
                        cameraType={mode} // front/back(default)
                    />
                    <View
                        style={{
                            alignItems: 'center',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                        }}>
                        <View
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                height: 150,
                                paddingRight: 20,
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setMode(
                                        mode === CameraType.Front
                                            ? CameraType.Back
                                            : CameraType.Front,
                                    );
                                }}
                                style={{
                                    height: 60,
                                    width: 60,
                                    marginBottom: 50,
                                }}>
                                <Image
                                    source={require('../../image/cameraFlipIcon.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View
                                style={{
                                    borderRadius: 350,
                                    borderWidth: 10,
                                    borderColor: 'white',
                                    width: 350,
                                    height: 400,
                                    marginBottom: 20,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: '800',
                                    color: 'white',
                                }}>
                                {'Hướng máy ảnh đến khu vực cần chụp'}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={async () => {
                                var image = await camera.current.capture();
                                console.log(image);
                                setResourcePath(image);
                                setVisible(false);
                                onChangeImage(image);
                            }}
                            style={{
                                backgroundColor: '#F7F7F7',
                                borderRadius: 60,
                                height: 60,
                                width: 60,
                                marginBottom: 50,
                            }}
                        />
                    </View>
                </Modal>
            </Portal>
        </>
    );
};

export default RequestPermission;

const styles = StyleSheet.create({
    // button: {
    //     borderWidth: 1,
    //     borderRadius: 5,
    //     color: 'white',
    //     marginHorizontal: 5,
    // },
    buttonContainer: {
        borderColor: '#000',
        borderRadius: 5,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 19,
        textAlign: 'center',
    },
});
