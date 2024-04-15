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
import { Step, Steps, nextStep, registerPerson, setRegisterName } from 'store/controls/Camera.slice';
import FaceCamera from './FaceCamera';
import { Asset } from 'react-native-image-picker';
import { Screen } from 'common/screenEnums';
import Loader from 'components/Loader';


const FrontFaceScreen = (props: {navigation: any}) => {
    const dispatch = useDispatch();
    const {errorMessage, loading, registerName, StepData, currentStep, RegisterPersonData} = useSelectorRoot(state => state.person);
    const [image, setImage] = useState<Asset | undefined>(currentStep?.image);
    const [countStep, setCountStep] = useState<number>(3);
    const [stepState, setStepState] = useState<Step | null>(currentStep);
    const [name, setName] = useState('');
    const [isRerender, setIsRerender] = useState(false);
    useEffect(() => {
        if(currentStep?.key != stepState?.key){
            setIsRerender(true);
            var time = setTimeout(() => {
                if(time) {
                    clearTimeout(time);
                }
                setIsRerender(false);
            }, 100)
        }
        setImage(currentStep?.image);
        setStepState(currentStep);
    }, [currentStep]);
    useEffect(() => {
        if (loading == false && !errorMessage && RegisterPersonData != null && RegisterPersonData.name == name)
        {
            props.navigation.replace(Screen.StackScreen.SuccessfullRegisterScreen);
        } else if (stepState && stepState?.key >= (countStep - 1)) {

        }
    }, [loading, errorMessage]);
    
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
            {
                registerName ?
                isRerender?
                null
                :<FaceCamera title={stepState?.title ?? 'Chụp ảnh'} 
                    src={image}
                    bottomTextButton={stepState && stepState?.key >= (countStep - 1) ? 'Hoàn thành' : 'Bước tiếp theo'} onSummit={(value: any) => {
                        var step = currentStep?.key ?? 0;
                        var current = {...Steps[step]};
                        current.image = value;
                        console.log(current);
                        if (stepState && stepState?.key >= (countStep - 1)) {
                            dispatch(registerPerson({name: registerName ?? '', body: StepData.map(x => x.image).concat(value)}));
                        } else {
                            dispatch(nextStep({currentStep: current, nextStep: Steps[step + 1]}));
                        }
                    } }></FaceCamera>
                :
                <>
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
                </SafeAreaView>
                <TouchableOpacity
                    onPress={() => {
                        dispatch(setRegisterName(name));
                        dispatch(nextStep({currentStep: null, nextStep: Steps[0]}));
                    }}
                    disabled={!name}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: !name ? '#DADADA' :'#329BF0',
                        borderRadius: 99,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        padding: 10,
                        width: '100%'
                    }}
                ><Text style={{
                    color: !name ? '#555555' : 'white',
                    fontSize: 13,
                    fontWeight: '600',
                }}>Bước tiếp theo</Text></TouchableOpacity>
                </> 
            }
        </SafeAreaView>
    );
};

export default FrontFaceScreen;
