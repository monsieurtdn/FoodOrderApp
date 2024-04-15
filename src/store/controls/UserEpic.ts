import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import UserApi from 'api/user/user.api';
import { RootEpic } from 'common/define-types';
import { catchError, filter, mergeMap, switchMap } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { IUserInfo } from 'types';

export interface IError {
    statusCode: number;
    errorCode: number;
    message: string;
}

export interface IUserState {
    loading: boolean;
    isSuccess: boolean;
    errorMessage: string | null;
    successMessage: string | null;
    error: IError | null;
    userInfo: IUserInfo | null;
}

const initState: IUserState = {
    loading: false,
    isSuccess: false,
    errorMessage: null,
    successMessage: null,
    error: null,
    userInfo: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        getUserInfo: (state, _action: PayloadAction<void>) => {
            state.loading = true;
        },
        getUserInfoSuccess: (state, action: PayloadAction<any>) => {
            // console.log(action.payload);
            state.loading = false;
            state.userInfo = action.payload;
        },
        error(state, action: PayloadAction<IError>) {
            state.loading = false;
            state.error = action.payload;
        },
        failRequest: (state, action: PayloadAction<string>) => {
            console.log(action.payload);
            state.loading = false;
            state.errorMessage = action.payload;
        },
    },
});

const getUserInfo$: RootEpic = action$ =>
    action$.pipe(
        filter(getUserInfo.match),
        switchMap(_re => {
            return UserApi.getUserInfo().pipe(
                mergeMap((res: any) => {
                    return [userSlice.actions.getUserInfoSuccess(res)];
                }),
                catchError((_e: AjaxError) => [
                    userSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );

export const UserEpics = [getUserInfo$];

export const { getUserInfo } = userSlice.actions;

export const userReducer = userSlice.reducer;
