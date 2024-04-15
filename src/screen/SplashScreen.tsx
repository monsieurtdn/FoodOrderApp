// Import React and Component
import { injectNavigation, isTokenValid } from 'api/http-client';
import { Screen } from 'common/screenEnums';
import Loader from 'components/Loader';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginRequest, setErrorMessage } from 'store/controls/LoginEpic';
import { fetchConfig } from 'store/controls/bootstrap.slice';
import { useSelectorRoot } from 'store/store';

const SplashScreen = ({ navigation }: { navigation: any }) => {
    const dispatch = useDispatch();
    const { isSuccess } = useSelectorRoot(x => x.bootstrap);
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);

    const { token, rememberLogin, loginName, password } = useSelectorRoot(
        state => state.persist,
    );
    const { errorMessage, loading } = useSelectorRoot(state => state.login);
    const isLoginSuccess = useSelectorRoot(state => state.login.isSuccess);
    // const token = store.getState().persist.token;
    console.log(token, 'token ở plash screen');
    console.log(rememberLogin, 'rememberLogin ở plash screen');

    useEffect(() => {
        dispatch(fetchConfig());
        injectNavigation(navigation);
    }, [navigation]);

    useEffect(() => {
        if (isSuccess) {
            finishSplash();
        }
    }, [isSuccess]);

    const finishSplash = () => {
        setAnimating(false);

        const isValid = isTokenValid(token);
        console.log(isValid, 'token còn hạn ko');
        // const decoded = jwt(token) as any;

        // const now = new Date();
        // console.log(now.getTime(), 'now');

        // const tokenExp = Utils.convertExpToDate(decoded.exp);

        // console.log(tokenExp, 'hạn token');

        if (rememberLogin) {
            if (!isValid) {
                // navigation.replace(token ? Screen.TabScreen.name : Screen.Auth);
                const loginInfo = {
                    username: loginName,
                    password: password,
                    remember: rememberLogin,
                };
                dispatch(loginRequest(loginInfo));
            } else {
                navigation.replace(Screen.TabScreen.name);
            }
        } else {
            navigation.replace(Screen.Auth);
        }
    };

    const loginSuccess = () => {
        dispatch(setErrorMessage(''));
        navigation.replace(Screen.TabScreen.name);
    };

    useEffect(() => {
        if (errorMessage === 'Có lỗi xảy ra, vui lòng thử lại sau') {
            navigation.replace('Auth');
        }
    }, [errorMessage]);

    useEffect(() => {
        if (isLoginSuccess) {
            loginSuccess();
        }
    }, [isLoginSuccess]);

    // useEffect(() => {
    //     if (workingTime === undefined) {
    //         dispatch(setWorkingTime([]));
    //     }
    // }, []);

    return (
        <View style={styles.container}>
            <Loader loading={loading} />
            <Image
                source={require('../../image/logo.png')}
                style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
            />
            <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
