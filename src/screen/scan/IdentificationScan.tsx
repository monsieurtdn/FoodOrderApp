import IdentifyApi from 'api/scan/identify.api';
import Utils from 'common/Utils';
import { IdentifyType } from 'common/define-types';
import { Screen } from 'common/screenEnums';
import Loader from 'components/Loader';
import { useWindowHook } from 'hooks/useWindowHook';
import React, { useRef, useState } from 'react';
import {
    Image,
    PermissionsAndroid,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
// import { request, PERMISSIONS } from 'react-native-permissions';
import { Camera, CameraType } from 'react-native-camera-kit';
import { Image as ImgCompressor } from 'react-native-compressor';
import { showMessage } from 'react-native-flash-message';
import RNFS from 'react-native-fs';
import { IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setScanInfor } from 'store/slice/ScanSlice';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import { ScanButton } from './components/ScanButton';

enum Step {
    FrontScan = 'FrontScan',
    BackScan = 'BackScan',
    Review = 'Review',
}
const IdentificationScan = ({ navigation }: { navigation: any }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [frontScan, setFrontScan] = useState<any>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [backScan, setBackScan] = useState<any>();
    // const [mergeScan, setMergeScan] = useState<any>();
    // const cropData = {
    //     offset: { x: 60, y: 410 },
    //     size: { width: 585, height: 450 },
    // };
    const compressSizer = (size: number) => {
        const MB = size / 1024;
        return 300 / MB;
    };

    const captureOptions = {
        target: {
            width: 300,
            height: 220,
        },
    };

    const destinationFolder = RNFS.DownloadDirectoryPath;

    const requestExternalStoragePermission = async (): Promise<boolean> => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const copyFile = async (
        sourceFilePath: string,
        destinationFolderPath: string,
    ) => {
        try {
            const hasPermission = await requestExternalStoragePermission();

            if (!hasPermission) {
                console.log('Quyền truy cập bộ nhớ ngoài chưa được cấp');
                return;
            }

            const sourceFileName = sourceFilePath.split('/').pop();
            const copiedFileName = 'copied-' + sourceFileName;
            const destinationFilePath = `${destinationFolderPath}/${copiedFileName}`;
            await RNFS.copyFile(sourceFilePath, destinationFilePath);

            console.log(
                `Tệp tin đã được copy thành công từ ${sourceFilePath} đến ${destinationFilePath}`,
            );
        } catch (error) {
            console.error('Lỗi khi sao chép tệp tin: ', error);
        }
    };
    const dispatch = useDispatchRoot();
    const cccdSteps = [
        {
            name: Step.FrontScan,
            label: 'Ảnh 1/2 (Mặt trước)',
            icon: 'camera-outline',
            onPress: async () => {
                const imgCaptured = await cameraRef.current.capture(
                    captureOptions,
                );
                console.log(imgCaptured);
                RNFS.stat(imgCaptured.uri).then(async stats => {
                    console.log(stats.size);
                    const compressedImg = await ImgCompressor.compress(
                        Utils.photoToUpload(imgCaptured.uri).uri,
                        {
                            quality: compressSizer(stats.size),
                        },
                    );
                    console.log(compressedImg);
                    copyFile(compressedImg, destinationFolder);
                    setFrontScan(compressedImg);
                    // ImageEditor.cropImage(compressedImg, cropData).then(
                    //     newUri => {
                    //         console.log('Cropped image uri', newUri);
                    //         copyFile(newUri, destinationFolder);
                    //         setFrontScan(newUri);
                    //     },
                    // );
                });
            },
        },
        {
            name: Step.BackScan,
            label: 'Ảnh 2/2 (Mặt sau)',
            icon: 'camera-outline',
            onPress: async () => {
                const imgCaptured = await cameraRef.current.capture({
                    width: 300,
                    height: 220,
                });
                console.log(imgCaptured);
                RNFS.stat(imgCaptured.uri).then(async stats => {
                    const compressedImg = await ImgCompressor.compress(
                        Utils.photoToUpload(imgCaptured.uri).uri,
                        {
                            compressionMethod: 'manual',
                            maxWidth: 1000,
                            quality: Number(
                                (300 / (stats.size / 1024)).toFixed(1),
                            ),
                        },
                    );
                    console.log(compressedImg);
                    copyFile(compressedImg, destinationFolder);
                    setBackScan(compressedImg);
                    // ImageEditor.cropImage(compressedImg, cropData).then(
                    //     newUri => {
                    //         console.log('Cropped image uri', newUri);
                    //         copyFile(newUri, destinationFolder);
                    //         setBackScan(newUri);
                    //     },
                    // );
                });
            },
        },
        {
            name: Step.Review,
            label: '',
            icon: 'arrow-right',
        },
    ];
    const ppSteps = [
        {
            name: Step.FrontScan,
            label: 'Ảnh 1/1',
            icon: 'camera-outline',
            onPress: async () => {
                const imgCaptured = await cameraRef.current.capture();
                RNFS.stat(imgCaptured.uri).then(async stats => {
                    const compressedImg = await ImgCompressor.compress(
                        Utils.photoToUpload(imgCaptured.uri).uri,
                        {
                            compressionMethod: 'manual',
                            maxWidth: 1000,
                            quality: compressSizer(stats.size),
                        },
                    );
                    console.log(compressedImg);
                    copyFile(compressedImg, destinationFolder);
                    setFrontScan(compressedImg);
                    // ImageEditor.cropImage(compressedImg, cropData).then(
                    //     newUri => {
                    //         console.log('Cropped image uri', newUri);
                    //         copyFile(newUri, destinationFolder);
                    //         setFrontScan(newUri);
                    //     },
                    // );
                });
            },
        },
        {
            name: Step.Review,
            label: '',
            icon: 'arrow-right',
        },
    ];
    const cameraRef = useRef<any>(null);
    const selectTypeSelected = useSelectorRoot(
        state => state.scan.selectedType,
    );
    const [flowSteps] = useState(
        selectTypeSelected === IdentifyType.CCCD ? cccdSteps : ppSteps,
    );
    const [currentStep, setCurrentStep] = useState(
        selectTypeSelected === IdentifyType.CCCD
            ? cccdSteps[0].name
            : ppSteps[0].name,
    );
    const { SCREEN_ORIENTATION, orientation } = useWindowHook();
    const handleSubmit = () => {
        if (selectTypeSelected) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('Photo', Utils.photoToUpload(frontScan));

            IdentifyApi.createIdentityCheck(
                selectTypeSelected,
                formData,
            ).subscribe(
                res => {
                    if (res) {
                        dispatch(setScanInfor(res));
                        navigation.navigate(
                            Screen.ScanScreen.IdentificationInfor,
                        );
                    }
                },
                err => {
                    console.log(err.response);
                    setIsLoading(false);
                    showMessage({
                        message:
                            'Có lỗi xảy ra khi quét thông tin. Vui lòng thử lại sau !',
                    });
                },
                () => setIsLoading(false),
            );
            // RNFS.readFile(frontScan.uri, "base64").then(data => {
            //     // binary data
            // });
        }
    };
    const handleResetCamera = () => {
        setFrontScan(undefined);
        setBackScan(undefined);
        setCurrentStep(flowSteps[0].name);
    };
    return (
        <SafeAreaView
            style={[
                styles.scanContainer,
                orientation === SCREEN_ORIENTATION.LANDSCAPE
                    ? styles.scanContainer_landscape
                    : {},
            ]}>
            <Loader loading={isLoading} />
            {currentStep === Step.Review ? (
                <>
                    <Image
                        source={{ uri: Utils.photoToUpload(frontScan).uri }}
                        resizeMode="contain"
                        style={
                            orientation === SCREEN_ORIENTATION.LANDSCAPE
                                ? { width: '80%', height: '100%' }
                                : { flex: 1, width: '100%' }
                        }
                    />
                    <IconButton
                        icon={'camera-outline'}
                        containerColor="#005BA5"
                        iconColor="white"
                        onPress={handleResetCamera}
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 10,
                        }}
                    />
                </>
            ) : (
                <View
                    style={[
                        orientation === SCREEN_ORIENTATION.LANDSCAPE
                            ? styles.cameraContainer_landscape
                            : styles.cameraContainer,
                        { position: 'relative' },
                    ]}>
                    <Camera
                        style={styles.camera}
                        ref={cameraRef}
                        cameraType={CameraType.Back} // front/back(default)
                    />
                    <View style={styles.cameraFrame}>
                        <View
                            style={
                                orientation === SCREEN_ORIENTATION.LANDSCAPE
                                    ? styles.cameraFrame_Inner_landscape
                                    : styles.cameraFrame_Inner
                            }>
                            <Text style={styles.cameraFrame_InnerText}>{`Đưa ${
                                selectTypeSelected === IdentifyType.CCCD ||
                                selectTypeSelected === IdentifyType.QR
                                    ? 'CCCD'
                                    : 'Hộ chiếu'
                            } vào khung hình`}</Text>
                        </View>
                    </View>
                </View>
            )}
            <View
                style={
                    orientation === SCREEN_ORIENTATION.LANDSCAPE
                        ? styles.buttonsContainer_landscape
                        : styles.buttonsContainer
                }>
                {flowSteps.map(
                    (step, index) =>
                        step.name === currentStep && (
                            <View
                                key={step.name}
                                style={{ gap: 20, alignItems: 'center' }}>
                                <Text style={{ fontWeight: '500' }}>
                                    {step.label}
                                </Text>
                                <ScanButton
                                    icon={
                                        <MaterialCommunityIcons
                                            name={step.icon}
                                            color="white"
                                            size={30}
                                        />
                                    }
                                    onPress={async () => {
                                        if (step.name === Step.Review) {
                                            handleSubmit();
                                        } else {
                                            step.onPress &&
                                                (await step.onPress());
                                        }
                                        index < flowSteps.length - 1 &&
                                            setCurrentStep(
                                                flowSteps[index + 1].name,
                                            );
                                    }}
                                />
                            </View>
                        ),
                )}
            </View>
        </SafeAreaView>
    );
};
export default IdentificationScan;

const styles = StyleSheet.create({
    scanContainer: {
        paddingVertical: 8,
        paddingHorizontal: 6,
        flex: 1,
        gap: 10,
        backgroundColor: 'white',
    },
    scanContainer_landscape: {
        flexDirection: 'row',
    },
    cameraContainer: {
        width: '100%',
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
    },
    cameraContainer_landscape: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
        borderColor: 'black',
        borderWidth: 1,
    },
    camera: {
        width: '100%',
        height: '100%',
    },
    buttonsContainer_landscape: {
        width: '20%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonsContainer: {
        width: '100%',
        minHeight: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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

    // scanContainer: {
    //     paddingVertical: 16,
    //     paddingHorizontal: 15,
    //     flex: 1,
    //     gap: 20,
    //     backgroundColor: 'white',
    // },
    // cameraContainer: {
    //     width: '100%',
    //     flex: 1,
    //     borderRadius: 12,
    //     overflow: 'hidden',
    //     borderColor: 'black',
    //     borderWidth: 1,
    // },
    // camera: {
    //     width: '100%',
    //     height: '100%',
    // },
    // buttonsContainer: {
    //     width: '100%',
    //     minHeight: 80,
    //     display: 'flex',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
});
