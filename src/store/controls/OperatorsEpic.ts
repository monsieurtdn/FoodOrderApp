import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import OperatorApi from 'api/operator/operator.api';
import { RootEpic } from 'common/define-types';
import { catchError, concatMap, filter, switchMap } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

export interface IError {
    statusCode: number;
    errorCode: number;
    message: string;
}

export interface ISearchRegistingEmployee {
    id: number;
    Name?: string;
}

export interface IEmployeeByOperatorId {
    id: string;
    employeeId: number;
    faceId: string;
    awsUserId: string;
    name: string;
    role: string;
    operatorId: string;
}

export interface IOperatorState {
    loading: boolean;
    isSuccess: boolean;
    errorMessage: string | null;
    successMessage: string | null;
    error: IError | null;
    employeesByOperatorId: IEmployeeByOperatorId[] | [];
}

const initState: IOperatorState = {
    loading: false,
    isSuccess: false,
    errorMessage: null,
    successMessage: null,
    error: null,
    employeesByOperatorId: [],
};

const operatorSlice = createSlice({
    name: 'operator',
    initialState: initState,
    reducers: {
        getEmployeesByOperatorId: (
            state,
            _action: PayloadAction<ISearchRegistingEmployee>,
        ) => {
            state.loading = true;
        },
        getEmployeesByOperatorIdSuccess: (
            state,
            action: PayloadAction<any>,
        ) => {
            // console.log(action.payload);
            state.loading = false;
            state.employeesByOperatorId = action.payload;
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

const getEmployeesByOperatorId$: RootEpic = action$ =>
    action$.pipe(
        filter(getEmployeesByOperatorId.match),
        switchMap(re => {
            return OperatorApi.getEmployeesByOperatorId(re.payload).pipe(
                concatMap((res: any) => {
                    return [
                        operatorSlice.actions.getEmployeesByOperatorIdSuccess(
                            res,
                        ),
                    ];
                }),
                catchError((_e: AjaxError) => [
                    operatorSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );

export const OperatorEpics = [getEmployeesByOperatorId$];

export const { getEmployeesByOperatorId } = operatorSlice.actions;

export const operatorReducer = operatorSlice.reducer;
