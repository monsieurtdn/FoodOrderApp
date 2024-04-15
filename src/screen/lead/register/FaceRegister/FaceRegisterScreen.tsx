// import { Checkbox } from '@ant-design/react-native';
import Utils from 'common/Utils';
import { Screen } from 'common/screenEnums';
import CTextInput from 'components/CTextInput';
import CameraFaceRegister from 'components/CameraFaceRegister';
import Loader from 'components/Loader';
import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    PermissionsAndroid,
    Platform,
    StyleSheet,
    Text,
    View,
    VirtualizedList,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { IconButton } from 'react-native-paper';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { unregisterFace } from 'store/controls/AttendanceEpic';
import { setSelectedRegisterEmployee } from 'store/controls/HomeEpic';
import {
    IEmployeeByOperatorId,
    getEmployeesByOperatorId,
} from 'store/controls/OperatorsEpic';
import { useSelectorRoot } from 'store/store';
import EmployeeBox from './components/EmployeeBox';
import UnregisterModal from './components/UnregisterModal';

interface IFaceRegisterScreen {
    navigation: any;
}

const FaceRegisterScreen: React.FC<IFaceRegisterScreen> = props => {
    const { navigation } = props;

    const dispatch = useDispatch();

    // const { token } = useSelectorRoot(state => state.persist);
    const { seletedOperation } = useSelectorRoot(state => state.home);
    const { employeesByOperatorId, loading } = useSelectorRoot(
        state => state.operator,
    );

    const [selectedEmployee, setSelectedEmployee] =
        useState<IEmployeeByOperatorId>();
    const [frontImage, setFrontImage] = useState<any>();
    const [leftImage, setLeftImage] = useState<any>();
    const [rightImage, setRightImage] = useState<any>();
    const [guideline, setGuideline] = useState({
        index: 0,
        message: 'Nhìn thẳng vào khung hình',
    });

    const [visible, setVisible] = useState(false);
    const [visibleUnregister, setVisibleUnregister] = useState(false);
    const [loadingg, setLoadingg] = useState(false);
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
    const [employeeName, setEmployeeName] = useState('');
    // const [frontImageJPG, setFrontImageJPG] = useState<Response>();
    // const [leftImageJPG, setLeftImageJPG] = useState<Response>();
    // const [rightImageJPG, setRightImageJPG] = useState<Response>();

    const handleSearch = (value: string) => {
        clearTimeout(timer);
        setEmployeeName(value);
        const timeoutId = setTimeout(() => {
            if (value) {
                if (seletedOperation) {
                    dispatch(
                        getEmployeesByOperatorId({
                            id: seletedOperation.id,
                            Name: value,
                        }),
                    );
                }
            } else {
                if (seletedOperation) {
                    dispatch(
                        getEmployeesByOperatorId({ id: seletedOperation.id }),
                    );
                }
            }
        }, 1500);
        setTimer(timeoutId);
    };

    const handleOnChangeImage = (value: any) => {
        console.log(value, 'value hinh');
        if (guideline.index === 0) {
            setFrontImage(value);
            setGuideline({ index: 1, message: 'Quay mặt sang trái' });
        } else if (guideline.index === 1) {
            setLeftImage(value);
            setGuideline({ index: 2, message: 'Quay mặt sang phải' });
        } else if (guideline.index === 2) {
            setRightImage(value);
            setGuideline({ index: 3, message: '' });
            setVisible(false);
        }

        // setVisibleFront(false);
        // setVisibleLeft(true);
    };

    const requestCameraPermission = async () => {
        if (Platform.OS === 'ios') {
            const granted = await check(PERMISSIONS.IOS.CAMERA);
            if (granted !== RESULTS.GRANTED) {
                const permissionResult = await request(PERMISSIONS.IOS.CAMERA);
                return permissionResult === RESULTS.GRANTED;
            } else {
                return true;
            }
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Access Required',
                    message: 'This App needs to Access your camera',
                    buttonPositive: 'Mở cài đặt',
                },
            );
            console.log(granted, 'granted android camera');
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
    };

    const handleSelectedEmployee = async (employee: IEmployeeByOperatorId) => {
        console.log(employee, 'employeeeee');
        setSelectedEmployee(employee);
        if (employee.awsUserId) {
            setVisibleUnregister(true);
        } else {
            requestCameraPermission().then(result => {
                if (result === true) {
                    setVisible(true);
                    dispatch(setSelectedRegisterEmployee(employee));
                } else {
                    showMessage({
                        message:
                            'Bạn đã từ chối cấp quyền truy cập camera. Hãy vào setting để bật quyền truy cập',
                        type: 'warning',
                    });
                }
            });
        }
    };

    const handleConfirmUnregister = () => {
        if (seletedOperation && selectedEmployee) {
            console.log(seletedOperation?.id, 'seletedOperation');
            console.log(selectedEmployee?.id, 'selectedEmployee');
            dispatch(
                unregisterFace({
                    seletedOperationId: seletedOperation?.id,
                    unregisterEmployeeId: selectedEmployee?.id,
                    searchName: employeeName,
                }),
            );
        }
        setVisibleUnregister(false);
    };

    const handleCloseUnRegisterModal = () => {
        setVisibleUnregister(false);
    };

    useEffect(() => {
        if (seletedOperation) {
            dispatch(getEmployeesByOperatorId({ id: seletedOperation.id }));
        }
    }, [seletedOperation]);

    // const photoToUpload = (file: any) => {
    //     const filename = file.uri.split('/').pop();
    //     const match = /\.(\w+)$/.exec(filename as string);
    //     const ext = match?.[1];
    //     const type = match ? `image/${match[1]}` : 'image';
    //     return {
    //         uri:
    //             Platform.OS === 'ios'
    //                 ? file.uri.replace('file://', '')
    //                 : file.uri,
    //         name: `image.${ext}`,
    //         type,
    //     } as any;
    // };

    //convert ảnh sang jpg
    useEffect(() => {
        if (guideline.index === 3) {
            console.log(frontImage, 'frontImage');
            console.log(leftImage, 'leftImage');
            console.log(rightImage, 'rightImage');

            if (frontImage && leftImage && rightImage) {
                const formData = new FormData();
                formData.append('photos', Utils.photoToUpload(frontImage));
                formData.append('photos', Utils.photoToUpload(leftImage));
                formData.append('photos', Utils.photoToUpload(rightImage));

                console.log(formData, 'formData');

                // const data = new URLSearchParams();
                // for (const item in formData) {
                //     data.append(item[0], item[1]);
                // }
                setLoadingg(true);
                fetch(
                    `https://recognition.tingconnect.com/api/Attendance/employee/${selectedEmployee?.id}/register`,
                    {
                        // headers: {
                        //     'content-type': 'multipart/form-data',
                        //     Authorization: token ? `Bearer ${token}` : '',
                        // },
                        method: 'POST',
                        body: formData,
                    },
                )
                    .then(res => res.text())
                    .then(res => {
                        // setQuitTourImagePathFile(res);
                        setLoadingg(false);
                        console.log('fect img: ', res);
                        if (res === 'Success') {
                            navigation.navigate(
                                Screen.TabScreen.registerSuccessfullyScreen,
                            );
                        } else {
                            navigation.navigate(
                                Screen.TabScreen.registerFailScreen,
                            );
                        }
                    })
                    .catch(err => console.log('img err: ', err));
            }
        }
    }, [guideline]);

    return (
        <SafeAreaView style={styles.modalContainer}>
            <Loader loading={loadingg} />
            <Loader loading={loading} />
            <View style={styles.modalContentHeadAndBody}>
                <View style={styles.modalContentHead}>
                    <View style={styles.headerLeftStyle}>
                        <IconButton
                            icon={'arrow-left'}
                            iconColor={'#FFFFFF'}
                            size={35}
                            onPress={() => {
                                navigation.navigate(
                                    Screen.TabScreen.name,
                                    'Main',
                                );
                            }}
                        />
                        <Text style={styles.headerTextStyle}>Chọn nhân sự</Text>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 13,
                    }}>
                    <CTextInput
                        value={employeeName}
                        onChangeText={text => handleSearch(text)}
                        placeholder="Tìm kiếm nhân sự"
                        onSubmitEditing={Keyboard.dismiss}
                        rightComponnent={
                            employeeName ? (
                                <IconButton
                                    icon={'close'}
                                    size={20}
                                    onPress={() => handleSearch('')}
                                />
                            ) : (
                                <IconButton
                                    icon={'account-search-outline'}
                                    // onPress={() => handleSearchEmployee()}
                                />
                            )
                        }
                        placeholderTextColor={'rgba(0, 0, 0, 0.25)'}
                        style={{ height: 40, paddingRight: 5 }}
                    />
                </View>
                <VirtualizedList
                    data={employeesByOperatorId}
                    initialNumToRender={10}
                    renderItem={({ item }) => (
                        <EmployeeBox
                            key={item.id}
                            employee={item}
                            handleRegisterSelectedEmployee={
                                handleSelectedEmployee
                            }
                        />
                    )}
                    keyExtractor={(item: IEmployeeByOperatorId) => item.id + ''}
                    getItemCount={() => employeesByOperatorId.length}
                    getItem={(data: IEmployeeByOperatorId[], idx) => data[idx]}
                />
                {/* <ScrollView contentContainerStyle={styles.bodyScrollView}>
                    {employeesByOperatorId?.map((employee, idx) => {
                        return (
                            <TouchableOpacity
                                key={idx}
                                style={styles.button}
                                onPress={() => {
                                    // console.log('aloo');
                                    handleRegisterSelectedEmployee(employee);
                                }}>
                                <View style={styles.infoBox}>
                                    <Text style={styles.textStyle}>
                                        {employee.name}
                                    </Text>
                                    <IconButton
                                        style={{
                                            // backgroundColor: 'red',
                                            width: 40,
                                            height: 40,
                                        }}
                                        icon={'chevron-right'}
                                        // iconColor={'#FFFFFF'}
                                        size={35}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView> */}
                <CameraFaceRegister
                    imageIndex={guideline.index}
                    title={guideline.message}
                    cameraType="back"
                    onChangeImage={value => handleOnChangeImage(value)}
                    visible={visible}
                    setVisible={setVisible}
                    navigation={navigation}
                />
                <UnregisterModal
                    visibleUnregister={visibleUnregister}
                    setVisibleUnregister={setVisibleUnregister}
                    handleConfirmUnregister={handleConfirmUnregister}
                    handleCloseUnRegisterModal={handleCloseUnRegisterModal}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#edeff0',
        width: '100%',
        position: 'relative',
    },
    modalContentHeadAndBody: {
        flex: 1,
        width: '100%',
    },
    modalContentHead: {
        width: '100%',
        backgroundColor: '#005BA5', //Set Header color
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerLeftStyle: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerTextStyle: {
        fontWeight: '700',
        fontSize: 24,
        color: '#FFFFFF',
    },
    bodyScrollView: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 20,
    },
    button: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        elevation: 5,
    },
    infoBox: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    textStyle: {
        paddingLeft: 19,
    },
    footerStyle: {
        borderRadius: 5,
        width: '100%',
        // height: 35,
        // marginTop: 670,
        // display: 'flex',
        // flexDirection: 'row',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FaceRegisterScreen;
