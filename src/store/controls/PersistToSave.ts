import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserData } from 'common/define-types';

export interface IWorkingTime {
    startTime: string;
    endTime: string;
}
export interface IUserInfo {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    lockoutEnabled: boolean;
    roles: string[];
}
export interface ILoginInfo {
    loginName: string;
    password: string;
    rememberLogin: boolean;
}

interface IPersistToSaveState {
    token: string;
    refreshToken: string;
    loginName: string;
    password: string;
    rememberLogin: boolean;
    userInfo: IUserInfo;
    workingTime: IWorkingTime[];
}

const initState: IPersistToSaveState = {
    token: '',
    refreshToken: '',
    loginName: '',
    password: '',
    rememberLogin: false,
    userInfo: {
        id: '',
        userName: '',
        email: '',
        phoneNumber: '',
        lockoutEnabled: false,
        roles: ['Guest'],
    },
    workingTime: [{ startTime: '00:00:00.000Z', endTime: '23:59:59.000Z' }],
};

const persistSlice = createSlice({
    name: 'persist',
    initialState: initState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload;
        },
        setLoginName: (state, action: PayloadAction<string>) => {
            state.loginName = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setRememberLogin: (state, action: PayloadAction<boolean>) => {
            state.rememberLogin = action.payload;
        },
        setUserInfo: (state, action: PayloadAction<any>) => {
            state.userInfo = action.payload;
        },
        setWorkingTime: (state, action: PayloadAction<IWorkingTime[]>) => {
            state.workingTime = action.payload;
        },
        resetPersitValue: state => {
            state.token = '';
            state.refreshToken = '';
            state.rememberLogin = false;
        },
    },
});

export const {
    setToken,
    setRefreshToken,
    setLoginName,
    setPassword,
    setRememberLogin,
    setUserInfo,
    setWorkingTime,
    resetPersitValue,
} = persistSlice.actions;

export const persistReducer = persistSlice.reducer;
