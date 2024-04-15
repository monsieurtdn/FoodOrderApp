import { Screen } from 'common/screenEnums';
import Loader from 'components/Loader';
import useLocationHook from 'hooks/useLocationHook';
import React, { useEffect } from 'react';
import {
    BackHandler,
    Image,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import {
    ISaveCheckInPayload,
    saveCheckIn,
} from 'store/controls/AttendanceEpic';
import { setIsRetakeImage } from 'store/controls/HomeEpic';
import { useSelectorRoot } from 'store/store';

type Props = {
    navigation: any;
};

const DetectFaceSuccessfullyScreen = (props: Props) => {
    const { navigation } = props;

    const dispatch = useDispatch();
    const { latitude, longitude } = useLocationHook();

    const { takenFaceCheckInPhoto, faceCheckInRespone } = useSelectorRoot(
        state => state.home,
    );
    const { isRetakeImage } = useSelectorRoot(state => state.home);
    // console.log(takenFaceCheckInPhoto, 'takenFaceCheckInPhoto');
    // console.log(faceCheckInRespone, 'faceCheckInRespone');
    const { loading } = useSelectorRoot(state => state.attendance);

    const handleNavigateFaceCheckScreen = () => {
        dispatch(setIsRetakeImage(!isRetakeImage));
        navigation.navigate(Screen.TabScreen.faceCheckScreen);
    };

    const handleSaveCheckIn = () => {
        if (latitude && longitude) {
            let checkInData: ISaveCheckInPayload[] = [];
            faceCheckInRespone?.employeeFaceIds.forEach(employee =>
                checkInData.push({
                    employeeFaceId: employee.id,
                    location: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude,
                    }),
                    imageUrl: faceCheckInRespone.imageUrl,
                }),
            );
            // console.log(checkInData, 'checkInData');
            dispatch(saveCheckIn(checkInData));
            navigation.navigate(Screen.TabScreen.checkSuccessfullyScreen);
        } else {
            showMessage({
                message:
                    'Lỗi khi lấy thông tin về vị trí hiện tại. Hãy kiểm tra lại setting.',
                type: 'warning',
            });
        }
    };

    useEffect(() => {
        const handleBackButton = () => {
            // Ngăn chặn việc quay lại màn hình trước đó khi nút "Back" được nhấn
            console.log('nút back vừa nhấn');
            return true;
        };

        // Đăng ký sự kiện khi nút "Back" được nhấn
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Hủy đăng ký sự kiện khi component unmount
        return () => {
            BackHandler.removeEventListener(
                'hardwareBackPress',
                handleBackButton,
            );
        };
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                // padding: 15,
            }}>
            <Loader loading={loading} />
            <View style={{ flex: 1, width: '100%' }}>
                <View
                    style={{
                        width: '100%',
                        backgroundColor: '#005BA5', //Set Header color
                        height: 60,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}>
                        <IconButton
                            icon={'close'}
                            iconColor={'#FFFFFF'}
                            size={35}
                            onPress={() => {
                                navigation.replace(Screen.TabScreen.jobScreen);
                            }}
                        />
                        <Text
                            style={{
                                fontWeight: '700',
                                fontSize: 24,
                                color: '#FFFFFF',
                            }}>
                            Danh sách điểm danh
                        </Text>
                    </View>
                </View>
                <SafeAreaView
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        minHeight: 300,
                        minWidth: 200,
                        width: '100%',
                        height: '100%',
                        // marginTop: 20,
                    }}>
                    <SafeAreaView
                        style={{
                            width: '100%',
                            height: 330,
                            // borderStyle: 'dashed',
                            // borderWidth: 1,
                            // borderTopWidth: 1,
                            borderBottomWidth: 1,
                            // borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}>
                        {takenFaceCheckInPhoto ? (
                            <Image
                                source={{
                                    uri: takenFaceCheckInPhoto.uri,
                                }}
                                resizeMode="contain"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        ) : (
                            <></>
                        )}
                    </SafeAreaView>
                    <View
                        style={{
                            width: '100%',
                            paddingLeft: 20,
                            marginTop: 20,
                            paddingHorizontal: 12,
                        }}>
                        <Text
                            style={{
                                fontWeight: '500',
                            }}>
                            Thông tin (
                            {faceCheckInRespone?.employeeFaceIds.length})
                        </Text>
                    </View>
                    <ScrollView
                        contentContainerStyle={{
                            width: '100%',
                            // height: 600,
                            display: 'flex',
                            flexDirection: 'column',
                            paddingHorizontal: 12,
                            // justifyContent: 'flex-start',
                            // alignItems: 'flex-start',
                        }}>
                        {faceCheckInRespone?.employeeFaceIds.map(
                            (employee, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            width: '100%',
                                            height: 76,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'flex-start',
                                            backgroundColor:
                                                'rgba(234, 246, 255, 1)',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: 'rgba(0, 0, 0, 0.15)',
                                            paddingLeft: 20,
                                            gap: 10,
                                            marginVertical: 5,
                                        }}>
                                        <View
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                flexDirection: 'row',
                                            }}>
                                            <View
                                                style={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                    alignItems: 'flex-start',
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                    }}>
                                                    {employee.name}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                    }}>
                                                    {employee.employeeCode
                                                        ? employee.employeeCode
                                                        : ''}
                                                    {' - '}
                                                    {employee.jobTitle
                                                        ? employee.jobTitle
                                                        : ''}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            },
                        )}
                    </ScrollView>
                </SafeAreaView>
            </View>
            <View
                style={{
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    // backgroundColor: 'red',
                }}>
                <TouchableOpacity
                    onPress={() => {
                        handleNavigateFaceCheckScreen();
                    }}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: '#c5e5ff',
                        borderRadius: 99,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // marginTop: 10,
                        // padding: 10,
                        width: '30%',
                        height: 45,
                    }}>
                    <Text
                        style={{
                            color: '#000000',
                            fontSize: 13,
                            fontWeight: '600',
                        }}>
                        Chụp lại
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        // props.onSummit && props.onSummit(image);
                        handleSaveCheckIn();
                    }}
                    // disabled={!image}
                    activeOpacity={0.8}
                    style={{
                        // backgroundColor: !image ? '#DADADA' : '#005BA5',
                        backgroundColor: '#005BA5',
                        borderRadius: 99,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // marginTop: 10,
                        // padding: 10,
                        width: '60%',
                        height: 45,
                    }}>
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: 13,
                            fontWeight: '600',
                        }}>
                        Lưu
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default DetectFaceSuccessfullyScreen;
