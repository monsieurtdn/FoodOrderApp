import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Utils from 'common/Utils';
import jwt from 'jwt-decode';
import {
    catchError,
    concatMap,
    filter,
    map,
    OperatorFunction,
    switchMap,
} from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import IdentityApi from '../../api/identity/identity.api';
import {
    LoginInfo,
    Profile,
    RootEpic,
    UserData,
} from '../../common/define-types';
import {
    setLoginName,
    setPassword,
    setRememberLogin,
    setToken,
    setUserInfo,
} from './PersistToSave';
// import {store} from 'store/store';

type MessageLogin = {
    content: string;
    errorCode?: number;
    error?: any;
};
type MessageForgot = {
    ErrorCode?: number;
    Message: string;
};
interface LoginState {
    loading: boolean;
    isSuccess: boolean;
    user: UserData | null;
    message: MessageLogin | undefined;
    messageForgot: MessageForgot | undefined;
    departmentId: number;
    refresh_token: string;
    profile: Profile | null;
    errorMessage: string | null;
    remember: boolean | null;
    userJWT: any | null;
    captchaId: string;
    captchaUrl: string;
}

const initState: LoginState = {
    loading: false,
    isSuccess: false,
    user: null,
    departmentId: 1,
    message: undefined,
    messageForgot: undefined,
    refresh_token: '',
    profile: null,
    errorMessage: null,
    remember: false,
    userJWT: null,
    captchaId: '',
    captchaUrl: '',
};

const loginSlice = createSlice({
    name: 'login',
    initialState: initState,
    reducers: {
        loginRequest(state, _action: PayloadAction<LoginInfo>) {
            state.loading = true;
        },
        loginSuccess(
            state,
            action: PayloadAction<{
                // user: any;
                remember: boolean;
            }>,
        ) {
            // var profile: Profile = action.payload.user
            //     ? JSON.parse(action.payload.user.profile)
            //     : null;
            state.loading = false;
            state.remember = action.payload.remember;
            state.isSuccess = true;
            // state.profile = profile;
            // state.userJWT = action.payload.user;
            state.captchaUrl = '';
            state.captchaId = '';
        },
        getInfoUser(state, action: PayloadAction<UserData | null>) {
            console.log(action.payload, 'user information');
            state.user = action.payload;
            if (state.remember) {
                Utils.setLocalStorage(
                    Utils.constant.email,
                    action.payload?.email,
                );
                Utils.setLocalStorage(Utils.constant.user, action.payload);
            }
        },
        forgotRequest(state, _action: PayloadAction<string>) {
            state.loading = true;
        },
        sendMailSuccess(
            state,
            action: PayloadAction<{ message: MessageLogin }>,
        ) {
            state.message = action.payload.message;
            state.loading = false;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setLoginSuccess(
            state,
            action: PayloadAction<{
                status: boolean;
                token: string;
                user: UserData;
            }>,
        ) {
            Utils.token = action.payload.token;
            state.user = action.payload.user;
            state.loading = false;
            state.isSuccess = action.payload.status;
            state.captchaUrl = '';
            state.captchaId = '';
        },
        message(state, action: PayloadAction<MessageLogin>) {
            state.message = action.payload;
            state.loading = false;
        },
        messageForgot(state, action: PayloadAction<MessageForgot>) {
            state.messageForgot = action.payload;
            state.loading = false;
        },
        clearMessageRequests(state) {
            state.loading = true;
        },
        clearMessage(state) {
            state.messageForgot = undefined;
            state.message = undefined;
            state.loading = false;
        },
        logout(state) {
            state.messageForgot = undefined;
            state.message = undefined;
            state.loading = false;
            state.user = null;
            state.isSuccess = false;
            Utils.clear();
        },
        getProfile: (state, _action: PayloadAction<void>) => {
            state.loading = true;
        },

        updateProfile: (state, _action: PayloadAction<UserData>) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action: PayloadAction<UserData>) => {
            state.loading = false;
            state.user = action.payload;
        },
        setCaptcha: (
            state,
            action: PayloadAction<{ captchaId: string; captchaUrl: string }>,
        ) => {
            state.captchaId = action.payload.captchaId;
            state.captchaUrl = action.payload.captchaUrl;
        },
        getCaptcha: (_state, _action: PayloadAction<string>) => {},

        failRequest: (state, action: PayloadAction<string>) => {
            console.log(action.payload);
            state.loading = false;
            state.errorMessage = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
    },
});

const login$: RootEpic = action$ =>
    action$.pipe(
        filter(loginRequest.match),
        switchMap(re => {
            return IdentityApi.login({
                identifier: re.payload.username,
                password: re.payload.password,
                // CaptchaId: re.payload.captchaId ?? undefined,
                // Captcha: re.payload.captcha ?? undefined,
            }).pipe(
                concatMap((res: any) => {
                    console.log(res, 'respsonee');
                    const token = res.token;
                    const userRes: any = jwt(token);

                    console.log(res, 'resopenseesese');
                    console.log(userRes, 'userResssss');
                    console.log(token, 'token');
                    console.log(
                        {
                            loginName: re.payload.username,
                            password: re.payload.password,
                            rememberLogin: true,
                        },
                        'login info',
                    );

                    if (re.payload.remember) {
                        return [
                            loginSlice.actions.loginSuccess({
                                // user: userRes,
                                remember: re.payload.remember,
                            }),
                            setToken(token),
                            // setRefreshToken(newRes.refresh_token),
                            setLoginName(re.payload.username),
                            setPassword(re.payload.password),
                            setRememberLogin(true),
                            setUserInfo(res.info),
                        ];
                    } else {
                        return [
                            loginSlice.actions.loginSuccess({
                                // user: userRes,
                                remember: re.payload.remember,
                            }),
                            setToken(token),
                            setLoginName(re.payload.username),
                            setPassword(re.payload.password),
                            setRememberLogin(false),
                            setUserInfo(res.info),
                        ];
                    }
                }),
                catchError((err: AjaxError) => {
                    console.log(err, 'errorrrr');
                    if (err?.name === 'AjaxError') {
                        const { status } = err;
                        if (err.response) {
                            // const { data } = err.response;
                            console.log(err.response);

                            if (
                                status === 400 &&
                                err.response.error === 'invalid_grant'
                            ) {
                                return [
                                    loginSlice.actions.failRequest(
                                        'Đăng nhập lỗi, kiểm tra lại tên đăng nhập và mật khẩu',
                                    ),
                                ];
                            }
                            if (
                                status === 400 &&
                                err.response.error === 'invalid_request'
                            ) {
                                return [
                                    loginSlice.actions.failRequest(
                                        'Tài khoản đã bị khóa. Nhập mã captcha để mở lại tài khoản',
                                    ),
                                    loginSlice.actions.setCaptcha({
                                        captchaId: err.response.CaptchaId,
                                        captchaUrl: `data:image/png;base64,${err.response.Captcha}`,
                                    }),
                                ];
                            }
                        }
                    }
                    return [
                        loginSlice.actions.failRequest(
                            'Đăng nhập lỗi, kiểm tra lại tên đăng nhập và mật khẩu',
                        ),
                    ];
                }),
            );
        }),
    );

const forgot$: RootEpic = (action$: {
    pipe: (
        arg0: OperatorFunction<
            Action<unknown>,
            { payload: string; type: 'login/forgotRequest' }
        >,
        arg1: OperatorFunction<
            unknown,
            { payload: MessageForgot; type: 'login/messageForgot' }
        >,
    ) => any;
}) =>
    action$.pipe(
        filter(forgotRequest.match),
        switchMap((re: any) => {
            return IdentityApi.forgotPassword(re.payload).pipe(
                map(() => {
                    return loginSlice.actions.messageForgot({
                        Message: 'success',
                    });
                }),
                catchError(err => [
                    loginSlice.actions.messageForgot(err.response),
                ]),
            );
        }),
    );
const clearMessage$: RootEpic = (action$: {
    pipe: (
        arg0: OperatorFunction<
            Action<unknown>,
            { payload: undefined; type: 'login/clearMessageRequests' }
        >,
        arg1: OperatorFunction<
            unknown,
            { payload: undefined; type: 'login/clearMessage' }
        >,
    ) => any;
}) =>
    action$.pipe(
        filter(clearMessageRequests.match),
        map(() => {
            return loginSlice.actions.clearMessage();
        }),
    );
const getProfile$: RootEpic = action$ =>
    action$.pipe(
        filter(getProfile.match),
        switchMap(_re => {
            return IdentityApi.getProfile().pipe(
                concatMap((profile: any) => {
                    console.log(profile, 'profile ở getProfile epic');
                    return [loginSlice.actions.getInfoUser(profile)];
                }),
                catchError((_e: AjaxError) => [
                    loginSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );
const updateProfile$: RootEpic = action$ =>
    action$.pipe(
        filter(updateProfile.match),
        switchMap(res => {
            return IdentityApi.updateProfile(res.payload).pipe(
                // mergeMap((profile: any) => {
                //     return [loginSlice.actions.updateProfileSuccess(profile)];
                // }),
                concatMap((_res: any) => {
                    return [
                        loginSlice.actions.updateProfileSuccess(_res),
                        // getProfile(),
                    ];
                }),
                catchError((_e: AjaxError) => [
                    loginSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );
const getCaptcha$: RootEpic = action$ =>
    action$.pipe(
        filter(getCaptcha.match),
        switchMap(res => {
            return IdentityApi.getCaptcha(res.payload).pipe(
                concatMap((_res: any) => {
                    if (_res) {
                        return [
                            loginSlice.actions.setCaptcha({
                                captchaId: _res.CaptchaId,
                                captchaUrl: `data:image/png;base64,${_res.Captcha}`,
                            }),
                            // getProfile(),
                        ];
                    }
                    return [
                        loginSlice.actions.failRequest(
                            'Có lỗi xảy ra khi lấy mã captcha',
                        ),
                    ];
                }),
                catchError((_e: AjaxError) => [
                    loginSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );
export const LoginEpics = [
    login$,
    getProfile$,
    forgot$,
    clearMessage$,
    updateProfile$,
    getCaptcha$,
];
export const {
    loginRequest,
    forgotRequest,
    clearMessageRequests,
    getInfoUser,
    updateProfile,
    setCaptcha,
    getCaptcha,
    setErrorMessage,
    logout,
    getProfile,
    setLoginSuccess,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
