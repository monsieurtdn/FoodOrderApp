import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    Linking,
    TouchableOpacity,
} from 'react-native';
import {useSelectorRoot} from 'store/store';
import {TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import { Step, Steps, attendancePerson, checkPerson, createPerson, detectPersonSuccess, nextStep, setRegisterName } from 'store/controls/Camera.slice';
import { Asset } from 'react-native-image-picker';
import { Screen } from 'common/screenEnums';
import FaceCamera from 'screen/register/FaceCamera';
import Loader from 'components/Loader';


const AttendanceScreen = (props: {navigation: any}) => {
    const dispatch = useDispatch();
    const {errorMessage, loading, registerName, StepData, currentStep, DetectPersonData} = useSelectorRoot(state => state.person);
    const [isRerender, setIsRerender] = useState(false);
    const [name, setName] = useState('');
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: 20
        }}>
            <Loader loading={loading} />
            <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '600',
                                                marginBottom: 5,
                                            }}>
                                            {'Họ và tên'}
                                        </Text>
                        <TextInput
                            inputMode="text"
                            placeholder="Nhập Tên"
                            onChangeText={(text) => setName(text)}
                            style={{
                                backgroundColor: '#fff',
                                borderColor: '#DBDADEAA',
                                color: '#222222',
                                borderWidth: 1,
                                width: '100%',
                                borderRadius: 6,
                                height: 40,
                                }}
                            />
            <View style={{
            flex: 0.5,
            width: '100%',
            padding: 20
                }}>
        <Text
                style={{
                    fontSize: 18,
                    fontWeight: '400',
                    marginBottom: 5,
                }}>
                {'Thông tin thành viên '}
            </Text>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '500',
                    marginBottom: 5,
                }}>
                {'Name: ' + (DetectPersonData?.name ?? '')}
            </Text>
            
            </View>
            <View style={{
            flex: 1,
            width: '100%',
                }}>
            {
                isRerender?
                null
                :<FaceCamera title={'Chụp ảnh'} 
                    onChange={() => {dispatch(detectPersonSuccess(null))}}
                    bottomTextButton={'Kiểm tra'} onSummit={(value: any) => {
                        dispatch(attendancePerson({name: name,body: value}));
                    } }></FaceCamera>
            }
            </View>
        </SafeAreaView>
    );
};

export default AttendanceScreen;
