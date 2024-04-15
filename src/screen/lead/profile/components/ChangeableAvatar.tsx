import SYSTEM_CONSTANTS from 'common/constants';
import React, { useState } from 'react';
import {
    Image,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Modal, Portal } from 'react-native-paper';
import { useSelectorRoot } from 'store/store';
import { showMessage } from 'react-native-flash-message';
import { AndroidPermissionEnum } from 'types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';

const MediaSelect = ({
    onPress,
    content,
    icon,
}: {
    onPress: () => void;
    content: string;
    icon: string;
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.mediaItem}>
            <View
                style={[
                    styles.iconContainer,
                    {
                        backgroundColor: '#dee1f5',
                    },
                ]}>
                <MaterialCommunityIcons
                    name={icon}
                    color={'#1A1A1A'}
                    size={26}
                />
            </View>
            <Text style={styles.mediaContent}>{content}</Text>
        </TouchableOpacity>
    );
};
interface IRequestPermission {
    permission: string;
    onChangeImage: (value: any) => void;
    lable?: string;
}

const ChangeableAvatar: React.FC<IRequestPermission> = ({
    permission,
    onChangeImage,
    lable,
}) => {
    const [visibleFilePopup, setVisibleFilePopup] = useState(false);
    const [resourcePath, setResourcePath] = useState<any>(null);

    const host = SYSTEM_CONSTANTS.HOST;
    const user = useSelectorRoot(state => state.login.user);
    // console.log(user, 'user?.avatarUrl')

    // console.log(`${host}${selectedIssue?.pathFile}`);
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

        if (result === false) {
            showMessage({
                message: 'Bạn phải cấp quyền chụp ảnh',
                type: 'danger',
            });
            return;
        }

        launchCamera(
            {
                cameraType: 'back',
                mediaType: 'photo',
                saveToPhotos: true,
            },
            res => {
                if (res.didCancel) {
                    console.log('User cancelled image picker');
                } else if (res.errorCode) {
                    console.log('ImagePicker Error: ', res.errorMessage);
                } else if (res.assets) {
                    setResourcePath(res.assets[0]);
                    onChangeImage(res.assets[0]);
                    console.log(res.assets[0]);
                }
            },
        );
    };
    const selectFileFromGalary = async () => {
        var result = await requestGalaryPermission();
        if (result === false) {
            // showMessage({
            //     message: 'Bạn phải cấp quyền mở thư viện ảnh',
            //     type: 'danger',
            // });
            // return;
        }
        launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
            },
            res => {
                if (res.didCancel) {
                    console.log('User cancelled image picker');
                } else if (res.errorCode) {
                    console.log('ImagePicker Error: ', res.errorMessage);
                } else if (res.assets) {
                    setResourcePath(res.assets[0]);
                    onChangeImage(res.assets[0]);
                    console.log(res.assets[0]);
                }
            },
        );
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {
                        // setVisibleFilePopup(true);
                    }}
                    activeOpacity={0.8}>
                    <Image
                        source={
                            resourcePath
                                ? { uri: resourcePath.uri }
                                : user?.avatarUrl
                                ? {
                                      uri: `${host}${user?.avatarUrl}`,
                                  }
                                : require('../../../../../image/default-avatar.png')
                        }
                        style={styles.avatar}
                    />
                </TouchableOpacity>
                {lable && <Text style={styles.lable}>{lable}</Text>}
            </View>

            <Portal>
                <Modal
                    visible={visibleFilePopup}
                    onDismiss={() => setVisibleFilePopup(false)}>
                    <Animated.View
                        entering={SlideInDown}
                        exiting={SlideOutDown}
                        style={styles.portalContainer}>
                        <TouchableOpacity
                            style={styles.overlay}
                            onPress={() => {
                                setVisibleFilePopup(false);
                            }}
                        />
                        <View style={styles.portalWrapper}>
                            <View style={styles.menu}>
                                {permission ===
                                    AndroidPermissionEnum.camera && (
                                    <MediaSelect
                                        onPress={() => {
                                            setVisibleFilePopup(false);
                                            selectFileFromCamera();
                                        }}
                                        content="Máy ảnh"
                                        icon="camera-outline"
                                    />
                                )}
                                {permission ===
                                    AndroidPermissionEnum.galary && (
                                    <MediaSelect
                                        onPress={() => {
                                            setVisibleFilePopup(false);
                                            selectFileFromGalary();
                                        }}
                                        content="Bộ sưu tập"
                                        icon="image-multiple"
                                    />
                                )}
                                {permission === AndroidPermissionEnum.both && (
                                    <>
                                        <MediaSelect
                                            onPress={() => {
                                                setVisibleFilePopup(false);
                                                selectFileFromCamera();
                                            }}
                                            content="Máy ảnh"
                                            icon="camera-outline"
                                        />
                                        <MediaSelect
                                            onPress={() => {
                                                setVisibleFilePopup(false);
                                                selectFileFromGalary();
                                            }}
                                            content="Bộ sưu tập"
                                            icon="image-multiple"
                                        />
                                    </>
                                )}
                            </View>
                        </View>
                    </Animated.View>
                </Modal>
            </Portal>
        </>
    );
};

export default ChangeableAvatar;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        gap: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 100 / 2,
    },
    lable: {
        fontSize: 16,
        fontWeight: '600',
    },
    portalContainer: {
        justifyContent: 'flex-end',
        height: '100%',
    },
    overlay: {
        flex: 1,
    },
    portalWrapper: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 16,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
    },
    menu: {
        flexDirection: 'column',
        width: '100%',
        gap: 5,
    },
    mediaItem: {
        alignItems: 'center',
        paddingVertical: 5,
        flexDirection: 'row',
        gap: 18,
    },
    mediaContent: {
        color: '#222222',
        fontSize: 20,
    },
    iconContainer: {
        width: 46,
        height: 46,
        borderRadius: 46 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
