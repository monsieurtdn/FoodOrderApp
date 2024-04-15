// import { Checkbox } from '@ant-design/react-native';
import Utils from 'common/Utils';
import { Screen } from 'common/screenEnums';
import CameraFaceCheck from 'components/CameraFaceCheck';
import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import {
    setFaceCheckInRespone,
    setTakenFaceCheckInPhoto,
} from 'store/controls/HomeEpic';
import { useSelectorRoot } from 'store/store';

interface IFaceCheckScreen {
    navigation: any;
}

const FaceCheckScreen: React.FC<IFaceCheckScreen> = props => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const { employeeInfo } = useSelectorRoot(state => state.employee);

    const [image, setImage] = useState<Asset | undefined>();
    console.log(image, 'image');
    const [visible, setVisible] = useState(false);

    const handleOnChangeImage = (value: any) => {
        if (value && employeeInfo) {
            const formData = new FormData();
            formData.append('UserId', employeeInfo.id);
            formData.append('Photo', Utils.photoToUpload(value));

            console.log(formData, 'formData');
            // const data = new URLSearchParams();
            // for (const item in formData) {
            //     data.append(item[0], item[1]);
            // }
            const t1 = performance.now();
            fetch(
                'https://recognition.tingconnect.com/api/Attendance/recognize',
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
                    console.log(visible, 'visible');
                    console.log('resposone: ', res);
                    const resp = JSON.parse(res);
                    // console.log(resp, 'resp');
                    if (resp.status === 409) {
                        navigation.replace(
                            Screen.TabScreen.detectFaceFailScreen,
                        );
                    } else if (resp.status === 404) {
                        navigation.replace(
                            Screen.TabScreen.detectFaceFailScreen,
                        );
                    } else {
                        if (resp.employeeFaceIds.length > 0) {
                            // if detect successfully but, respones face id is 0, then move to detect fail
                            dispatch(
                                setTakenFaceCheckInPhoto(
                                    Utils.photoToUpload(value),
                                ),
                            );
                            dispatch(setFaceCheckInRespone(resp));
                            navigation.navigate(
                                Screen.TabScreen.detectFaceSuccessfullyScreen,
                            );
                        } else {
                            navigation.replace(
                                Screen.TabScreen.detectFaceFailScreen,
                            );
                        }
                    }
                    setVisible(false);
                    const t2 = performance.now();
                    console.log(`recognize took ${t2 - t1}`);
                })
                .catch(err => console.log('resposone err: ', err));
            setImage(value);
        }
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                padding: 15,
            }}>
            <CameraFaceCheck
                onChangeImage={value => handleOnChangeImage(value)}
                visible={visible}
                setVisible={setVisible}
                navigation={navigation}
            />
            <SafeAreaView
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 300,
                    minWidth: 200,
                    width: '100%',
                    height: '100%',
                    paddingHorizontal: 10,
                }}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        </SafeAreaView>
    );
};

export default FaceCheckScreen;
