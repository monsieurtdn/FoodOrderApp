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
import {ScrollView} from 'react-native-gesture-handler';
import {Button, TextInput} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import RequestPermission from 'components/RequestPermission';
import { AndroidPermissionEnum } from 'types';
import { createPerson } from 'store/controls/Camera.slice';


const RegisterFaceScreen = (props: {navigation: any}) => {
    const {user} = useSelectorRoot(x => x.login);
    const dispatch = useDispatch();
    const [images, setImages] = useState<any[]>([]);
    const [name, setName] = useState('');
    const {errorMessage, loading, PersonData} = useSelectorRoot(state => state.person);
    const [person, setPerson] = useState(PersonData);
    useEffect(() => {
        if (person?.name != PersonData?.name && loading == false && !errorMessage)
        {
            setPerson(PersonData);
            props.navigation.goBack();
        }
    }, [loading, errorMessage]);

    const handleOnChangeImage = (index: number, value: any) => {
        if (value) {
            images[index] = value;
            setImages(images);
        }
        console.log('handleOnChangeImage');
        console.log(value);
    }
    
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: 20
        }}>
            <ScrollView
                contentContainerStyle={{
                    alignContent: 'center',
                    alignItems: 'center',
                }}>
                <SafeAreaView
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 300,
                        minWidth: 200,
                        width: '100%',
                        height: '100%',
                    }}>
                        <Text
                                            style={{
                                                flex: 1,
                                                fontSize: 12,
                                                fontWeight: '600',
                                                marginBottom: 5,
                                            }}>
                                            {'Họ và tên'}
                                        </Text>
                    <View
                        style={{flexDirection: 'row', flex: 1}}>
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
                    </View>
                    {
                        PersonData ? 
                        <>
                        <Text style={{
                            color: 'red',
                            fontSize: 13,
                            fontWeight: '600',
                        }}>{errorMessage}</Text>
                        </>
                        : null
                    }
                    <View
                        style={{flexDirection: 'row', flex: 1}}>
                        <RequestPermission 
                            permission={AndroidPermissionEnum.camera} 
                            onChangeImage={(value) => handleOnChangeImage(1, value)} 
                            cameraType='front'
                            title='Nhìn thẳng'
                            />
                        <RequestPermission 
                            permission={AndroidPermissionEnum.camera} 
                            onChangeImage={(value) => handleOnChangeImage(2, value)} 
                            cameraType='front'
                            title='Nghiên sang trái'
                            />
                    </View>
                    <View
                        style={{flexDirection: 'row', flex: 1}}>
                        <RequestPermission 
                            permission={AndroidPermissionEnum.camera} 
                            onChangeImage={(value) => handleOnChangeImage(3, value)} 
                            cameraType='front'
                            title='Nghiên sang phải'
                            />
                        <RequestPermission 
                            permission={AndroidPermissionEnum.camera} 
                            onChangeImage={(value) => handleOnChangeImage(4, value)} 
                            cameraType='front'
                            title='Nhìn lên trên'
                            />
                    </View>
                    <View
                        style={{flexDirection: 'row', flex: 1}}>
                        <RequestPermission 
                            permission={AndroidPermissionEnum.camera} 
                            onChangeImage={(value) => handleOnChangeImage(5, value)} 
                            cameraType='front'
                            title='Nhìn xuống dưới'
                            />
                        <RequestPermission 
                            permission={AndroidPermissionEnum.camera} 
                            onChangeImage={(value) => handleOnChangeImage(6, value)} 
                            cameraType='front'
                            title='Không đeo kính'
                            />
                    </View>
                </SafeAreaView>
            </ScrollView>
            <TouchableOpacity
                    onPress={() => {
                        console.log(images);
                        dispatch(createPerson({name: name, body: images}))
                    }}
                    disabled={!name || images.length < 6}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: !name || images.length < 6 ? '#DADADA' :'#329BF0',
                        borderRadius: 99,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        padding: 10,
                        width: '100%'
                    }}
                ><Text style={{
                    color: !name || images.length < 6 ? '#555555' : 'white',
                    fontSize: 13,
                    fontWeight: '600',
                }}>Submit</Text></TouchableOpacity>
        </SafeAreaView>
    );
};

export default RegisterFaceScreen;
