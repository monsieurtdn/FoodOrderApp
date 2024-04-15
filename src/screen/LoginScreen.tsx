// Import React and Component
import React, { createRef, useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import Utils from 'common/Utils';
import { Screen } from 'common/screenEnums';
import CCheckBox from 'components/CCheckBox';
import CTextInput from 'components/CTextInput';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loginRequest, setErrorMessage } from 'store/controls/LoginEpic';
import { useDispatchRoot, useSelectorRoot } from 'store/store';
import Loader from '../components/Loader';

const LoginScreen = (props: { navigation: any }) => {
    const dispatch = useDispatchRoot();
    const { message, loading, isSuccess, errorMessage } = useSelectorRoot(
        state => state.login,
    );

    const { navigation } = props;
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const captchaId = useSelectorRoot(state => state.login.captchaId);
    const captchaUrl = useSelectorRoot(state => state.login.captchaUrl);

    const handleOnChange = (value: boolean) => {
        setIsChecked(value);
    };

    const passwordInputRef = createRef<TextInput>();
    const captchaInputRef = createRef<TextInput>();

    useEffect(() => {
        if (isSuccess) {
            loginSuccess();
        }
    }, [isSuccess]);
    useEffect(() => {
        setLoading(loading);
    }, [loading]);
    useEffect(() => {
        if (message && message.content && message.content !== '') {
            showError(message.content.split('_').join(' '));
        } else {
            if (isLoading) {
                setLoading(false);
            }
        }
    }, [message]);

    const handleSubmitPress = () => {
        setErrorText('');
        if (!userEmail) {
            showError('Email không được để trống');
            return;
        }
        if (!userPassword) {
            showError('Mật khẩu không được để trống');
            return;
        }
        if (captchaId && captchaId !== '' && captchaValue === '') {
            showError('Mã captcha không được để trống');
            return;
        }
        setLoading(true);
        const loginInfo =
            captchaId === ''
                ? {
                      username: userEmail,
                      password: userPassword,
                      remember: isChecked,
                  }
                : {
                      username: userEmail,
                      password: userPassword,
                      remember: isChecked,
                      captchaId,
                      captcha: captchaValue,
                  };
        dispatch(loginRequest(loginInfo));
    };
    const loginSuccess = () => {
        setLoading(false);
        // dispatch(getProfile());
        const loginInfo = {
            username: userEmail,
            password: userPassword,
            remember: isChecked,
        };
        Utils.loginInfo = loginInfo;

        navigation.replace(Screen.TabScreen.name);
        dispatch(setErrorMessage(''));
    };

    const showError = (error: any) => {
        if (isLoading) {
            setLoading(false);
        }
        if (error.error) {
            setErrorText(error.error);
        }
        if (error as string) {
            setErrorText(error);
        }
    };

    useEffect(() => {
        if (errorMessage) {
            showError(errorMessage);
            dispatch(setErrorMessage(''));
        }
    }, [errorMessage]);

    // useEffect(() => {
    //     if (workingTime === undefined) {
    //         dispatch(setWorkingTime([]));
    //     }
    // }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                height: '100%',
                backgroundColor: '#FFFFFF',
                justifyContent: 'center',
            }}>
            <ImageBackground
                source={require('../../image/tingLoginBackground.png')} // Đường dẫn đến hình ảnh nền
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                <Loader loading={isLoading} />
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        minHeight: '100%',
                    }}>
                    <KeyboardAvoidingView enabled>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingBottom: 20,
                            }}>
                            <Image
                                source={require('../../image/logo.png')}
                                style={{
                                    resizeMode: 'contain',
                                    // margin: 15,
                                    width: 120,
                                    height: 120,
                                }}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <Text style={styles.labelStyle}>Email</Text>
                            <CTextInput
                                style={{ borderRadius: 5 }}
                                onChangeText={x => setUserEmail(x)}
                                placeholder="Nhập email đã đăng ký"
                                keyboardType="email-address"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                placeholderTextColor={'#BFBFBF'}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <Text style={styles.labelStyle}>Mật khẩu</Text>
                            <CTextInput
                                onChangeText={x => setUserPassword(x)}
                                refC={passwordInputRef}
                                placeholder="Nhập mật khẩu"
                                secureTextEntry={!showPassword}
                                onSubmitEditing={Keyboard.dismiss}
                                rightComponnent={
                                    <IconButton
                                        icon={!showPassword ? 'eye' : 'eye-off'}
                                        onPress={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    />
                                }
                                placeholderTextColor={'#BFBFBF'}
                            />
                        </View>
                        {captchaId !== '' && captchaId && (
                            <>
                                <View
                                    style={{
                                        ...styles.SectionStyle,
                                        ...styles.captchaContainer,
                                    }}>
                                    <Image
                                        source={{ uri: captchaUrl }}
                                        style={styles.captchaImg}
                                    />
                                    <IconButton
                                        style={{ marginTop: 20 }}
                                        icon={'reload'}
                                        onPress={
                                            () => {}
                                            // setShowPassword(!showPassword)
                                        }
                                    />
                                </View>
                                <View style={styles.SectionStyle}>
                                    <Text style={styles.labelStyle}>
                                        Mã captcha
                                    </Text>
                                    <CTextInput
                                        style={{
                                            borderWidth: 2,
                                            backgroundColor: 'red',
                                        }}
                                        onChangeText={captcha =>
                                            setCaptchaValue(captcha)
                                        }
                                        refC={captchaInputRef}
                                        placeholder="Nhập mã captcha"
                                        onSubmitEditing={Keyboard.dismiss}
                                        placeholderTextColor={
                                            'rgba(197, 229, 255, 1)'
                                        }
                                    />
                                </View>
                            </>
                        )}
                        <View style={styles.checkboxStyle}>
                            <CCheckBox
                                onChangeValue={handleOnChange}
                                label={'Lưu đăng nhập'}
                                labelColor="rgba(0, 91, 165, 1)"
                            />
                            {/* <TouchableOpacity
                            onPress={() => {
                                console.log('vừa nhấn');
                            }}>
                            <Text style={styles.forgetPasswordTextStyle}>
                                Quên mật khẩu
                            </Text>
                        </TouchableOpacity> */}
                        </View>
                        {errorText !== '' ? (
                            <Text style={styles.errorTextStyle}>
                                {errorText}
                            </Text>
                        ) : (
                            <></>
                        )}
                        <TouchableOpacity
                            style={styles.buttonStyle}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>
                                Đăng nhập
                            </Text>
                        </TouchableOpacity>
                        {/* <View
                        style={{
                            height: 40,
                            marginVertical: 20,
                            marginHorizontal: 35,
                            margin: 10,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                justifyContent: 'center',
                                color: '#222222',
                            }}>
                            {'Liên hệ quản trị viên \n trong trường hợp '}
                            <Text
                                onPress={() => {
                                    console.log('quên mật khẩu');
                                }}
                                style={{
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    color: '#222222',
                                    textDecorationLine: 'underline',
                                }}>
                                quên mật khẩu
                            </Text>
                        </Text>
                    </View> */}
                    </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        alignContent: 'center',
    },
    inputTitle: {
        flexDirection: 'row',
        height: 19,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        marginBottom: -10,
        fontWeight: '500',
        color: '#1a2b40',
    },
    SectionStyle: {
        flexDirection: 'column',
        rowGap: 5,
        height: 75,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        borderRadius: 0,
        justifyContent: 'space-between',
    },
    checkboxStyle: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 35,
        marginTop: 10,
    },
    bottomStyle: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
        marginTop: 0,
        borderRadius: 0,
        justifyContent: 'center',
    },
    labelStyle: {
        fontWeight: '700',
        letterSpacing: 0.5,
        color: 'rgba(0, 91, 165, 1)',
    },
    buttonStyle: {
        backgroundColor: 'rgba(0, 91, 165, 1)',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '##667080',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 15,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        elevation: 7,
    },
    buttonTextStyle: {
        color: '#ffffff',
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: '500',
    },
    inputStyle: {
        flex: 1,
        color: '#18273A',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    noAccountTexttyle: {
        color: '#7A7A7A',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    registerTextStyle: {
        color: '#1676F3',
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        paddingHorizontal: 20,
    },
    captchaContainer: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
    },
    captchaImg: {
        flex: 1,
        resizeMode: 'contain',
    },
    forgetPasswordTextStyle: {
        fontStyle: 'italic',
        textDecorationLine: 'underline',
        color: 'rgba(0, 91, 165, 1)',
    },
});
