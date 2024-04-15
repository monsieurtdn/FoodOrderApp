import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import ShiftApi from 'api/shift/shift.api';
import { RootEpic } from 'common/define-types';
import { catchError, concatMap, filter, switchMap } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

export interface IError {
    statusCode: number;
    errorCode: number;
    message: string;
}

export interface IShift {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
}

export interface IShiftsState {
    loading: boolean;
    isSuccess: boolean;
    errorMessage: string | null;
    successMessage: string | null;
    error: IError | null;
    allShifts: IShift[] | [];
}

const initState: IShiftsState = {
    loading: false,
    isSuccess: false,
    errorMessage: null,
    successMessage: null,
    error: null,
    allShifts: [],
};

const shiftSlice = createSlice({
    name: 'shift',
    initialState: initState,
    reducers: {
        getAllShifts: (state, _action: PayloadAction<void>) => {
            state.loading = true;
        },
        getAllShiftsSuccess: (state, action: PayloadAction<any>) => {
            // console.log(action.payload);
            state.loading = false;
            state.allShifts = action.payload;
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

const getAllShifts$: RootEpic = action$ =>
    action$.pipe(
        filter(getAllShifts.match),
        switchMap(_re => {
            return ShiftApi.getAllShifts().pipe(
                concatMap((res: any) => {
                    return [shiftSlice.actions.getAllShiftsSuccess(res)];
                }),
                catchError((_e: AjaxError) => [
                    shiftSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );

export const ShiftEpics = [getAllShifts$];

export const { getAllShifts } = shiftSlice.actions;

export const shiftReducer = shiftSlice.reducer;
