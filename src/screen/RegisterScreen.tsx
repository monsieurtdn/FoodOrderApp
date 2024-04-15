// Import React and Component
import React, { useState, createRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';

import Loader from '../components/Loader';

const RegisterScreen = (props: {
    navigation: { navigate: (arg0: string) => void };
}) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorText, setErrortext] = useState('');
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

    const emailInputRef = createRef<TextInput>();
    const ageInputRef = createRef<TextInput>();
    const addressInputRef = createRef<TextInput>();
    const passwordInputRef = createRef<TextInput>();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!userName) {
            Alert.alert('Chưa có tên đăng nhập');
            return;
        }
        if (!userEmail) {
            Alert.alert('Chưa có tên đăng nhập');
            return;
        }
        if (!userAge) {
            Alert.alert('Chưa có tuổi');
            return;
        }
        if (!userAddress) {
            Alert.alert('Chưa có địa chỉ');
            return;
        }
        if (!userPassword) {
            Alert.alert('Chưa có mật khẩu');
            return;
        }
        //Show Loader
        setLoading(true);
        var dataToSend = {
            name: userName,
            email: userEmail,
            age: userAge,
            address: userAddress,
            password: userPassword,
        };

        fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                //Header Defination
                'Content-Type':
                    'application/x-www-form-urlencoded;charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(responseJson => {
                //Hide Loader
                setLoading(false);
                // If server response message same as Data Matched
                if (responseJson.status === 'success') {
                    setIsRegistrationSuccess(true);
                } else {
                    setErrortext(responseJson.msg);
                }
            })
            .catch(() => {
                //Hide Loader
                setLoading(false);
            });
    };
    if (isRegistrationSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../../image/success.png')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center',
                    }}
                />
                <Text style={styles.successTextStyle}>
                    Registration Successful
                </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../image/logo.png')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={UserName => setUserName(UserName)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Name"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                emailInputRef.current &&
                                emailInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={UserEmail => setUserEmail(UserEmail)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Email"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="email-address"
                            ref={emailInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                passwordInputRef.current &&
                                passwordInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={UserPassword =>
                                setUserPassword(UserPassword)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Password"
                            placeholderTextColor="#8b9cb5"
                            ref={passwordInputRef}
                            returnKeyType="next"
                            secureTextEntry={true}
                            onSubmitEditing={() =>
                                ageInputRef.current &&
                                ageInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={UserAge => setUserAge(UserAge)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Age"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="numeric"
                            ref={ageInputRef}
                            returnKeyType="next"
                            onSubmitEditing={() =>
                                addressInputRef.current &&
                                addressInputRef.current.focus()
                            }
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={UserAddress =>
                                setUserAddress(UserAddress)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Address"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            ref={addressInputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    {errorText !== '' ? (
                        <Text style={styles.errorTextStyle}>{errorText}</Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
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
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: '#18273A',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});
