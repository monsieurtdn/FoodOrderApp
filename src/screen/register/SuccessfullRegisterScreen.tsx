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
import { useDispatch } from 'react-redux';
import { nextStep, registerPersonSuccess, setRegisterName } from 'store/controls/Camera.slice';
import {useSelectorRoot} from 'store/store';


const SuccessfullRegisterScreen = (props: {navigation: any}) => {
    const {RegisterPersonData} = useSelectorRoot(state => state.person);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: 20
        }}>
            <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: 20
        }}>
<Text
                style={{
                    fontSize: 18,
                    fontWeight: '600',
                    marginBottom: 5,
                    color: 'green'
                }}>
                {'Đăng ký thành công '}
            </Text>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '600',
                    marginBottom: 5,
                }}>
                {RegisterPersonData?.name}
            </Text>
            </View>
            
            <TouchableOpacity
                    onPress={() => {
                        dispatch(setRegisterName(null));
                        dispatch(nextStep({currentStep: null, nextStep: null }));
                        dispatch(registerPersonSuccess(null));
                        props.navigation.goBack();
                    }}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: '#329BF0',
                        borderRadius: 99,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        padding: 10,
                        width: '100%'
                    }}
                ><Text style={{
                    color: 'white',
                    fontSize: 13,
                    fontWeight: '600',
                }}>Hoàn thành</Text></TouchableOpacity>
        </SafeAreaView>
    );
};

export default SuccessfullRegisterScreen;
