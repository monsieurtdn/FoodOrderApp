import { Screen } from 'common/screenEnums';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import { Asset } from 'react-native-image-picker';
import { IconButton, Modal, Portal } from 'react-native-paper';
import { useSelectorRoot } from 'store/store';

interface IRequestPermission {
    onChangeImage: (value: Asset) => void;
    visible: boolean;
    setVisible: (value: any) => void;
    navigation: any;
}

const CameraFaceCheck: React.FC<IRequestPermission> = props => {
    const { onChangeImage, visible, setVisible, navigation } = props;

    const { isRetakeImage } = useSelectorRoot(state => state.home);

    const [resourcePath, setResourcePath] = useState<Asset | undefined>();
    console.log(resourcePath, 'resourcePath camerafacecheck');

    const camera = useRef<any>(null);
    const [mode, setMode] = useState(CameraType.Back);
    // const [isIconVisible, setIsIconVisible] = React.useState(true);

    useEffect(() => {
        setVisible(true);
        // setTimeout(() => {
        //     setIsIconVisible(false);
        // }, 3000);
    }, [isRetakeImage]);

    return (
        <>
            <Portal>
                <Modal
                    visible={visible}
                    // onDismiss={() => setVisible(false)}
                    style={{ justifyContent: 'flex-start' }}>
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
                        <View style={styles.modalContentHead}>
                            <View style={styles.headerLeftStyle}>
                                <IconButton
                                    icon={'arrow-left'}
                                    iconColor={'#FFFFFF'}
                                    size={35}
                                    onPress={() => {
                                        // navigation.navigate(
                                        //     Screen.TabScreen.jobScreen,
                                        // );
                                        navigation.replace(
                                            Screen.TabScreen.jobScreen,
                                        );
                                        setVisible(false);
                                    }}
                                />
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
                                        // marginBottom: 50,
                                        marginTop: 20,
                                        marginRight: 20,
                                    }}>
                                    <Image
                                        source={require('../../image/cameraFlipIcon.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            {/* <View
                                style={{
                                    borderRadius: 350,
                                    borderWidth: 10,
                                    borderColor: 'white',
                                    width: 350,
                                    height: 420,
                                    marginBottom: 20,
                                }}
                            /> */}
                        </View>
                        <IconButton
                            style={{
                                backgroundColor: '#005BA5',
                                marginBottom: 20,
                            }}
                            icon={'camera-outline'}
                            iconColor={'#FFFFFF'}
                            size={45}
                            onPress={async () => {
                                var image = await camera.current.capture();
                                console.log(image);
                                setResourcePath(image);
                                setVisible(false);
                                onChangeImage(image);
                                // navigation('JobScreen')
                            }}
                        />
                    </View>
                </Modal>
            </Portal>
        </>
    );
};

export default CameraFaceCheck;

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
    modalContentHeadAndBody: {
        flex: 1,
        width: '100%',
    },
    modalContentHead: {
        width: '100%',
        // backgroundColor: '#005BA5', //Set Header color
        height: 70,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeftStyle: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
    },
    headerTextStyle: {
        fontWeight: '700',
        fontSize: 24,
        color: '#FFFFFF',
    },
});
