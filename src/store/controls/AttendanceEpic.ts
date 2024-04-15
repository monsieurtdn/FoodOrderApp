import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import AttendanceApi from 'api/attendance/attendance.api';
import Utils from 'common/Utils';
import { RootEpic } from 'common/define-types';
import { catchError, concatMap, filter, switchMap } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { getEmployeesByOperatorId } from './OperatorsEpic';

export interface IError {
    statusCode: number;
    errorCode: number;
    message: string;
}

export interface IUnregisterFacePayload {
    seletedOperationId: number;
    unregisterEmployeeId: string;
    searchName?: string;
}

export interface INote {
    id: string;
    employeeDateId: string;
    content: string;
}

export interface ISaveCheckInPayload {
    employeeFaceId: string;
    location: string;
    imageUrl: string;
}

export interface ISaveMealPayload {
    searchName?: string;
    employeeDate: any[];
    operatorId: number;
}

export interface ISaveMealResponse {
    type: 'string';
    title: 'string';
    status: 0;
    detail: 'string';
    instance: 'string';
    additionalProp1: 'string';
    additionalProp2: 'string';
    additionalProp3: 'string';
}

export interface ISaveMealEmployeeDate {
    id: string;
    date: string;
    employeeFaceId: string;
    meals: IMeal[];
}
export interface ISaveMeal {
    employeeDate: ISaveMealEmployeeDate[];
}

export interface IMeal {
    id: string;
    employeeDateId: string;
    information: string;
    meal1?: number;
    meal2?: number;
}

export interface ICheckInTime {
    id: string;
    employeeDateId: string;
    date: string; //iostring
    location: string;
    imageUrl: string;
}
export interface IEmployeeDate {
    checkInTime: ICheckInTime[] | [];
    meals: IMeal[];
    notes: INote[];
    id: string;
    date: string;
    employeeFaceId: string;
}

export interface IEmployeeOfOperator {
    employeeDate: IEmployeeDate[];
    id: string;
    employeeCode: string;
    employeeId: number;
    awsUserId: string;
    name: string;
    role: string;
    jobTitle: string;
    operatorId: string;
}

export interface IEmployeeState {
    loading: boolean;
    isSuccess: boolean;
    errorMessage: string | null;
    successMessage: string | null;
    error: IError | null;
    employeeOfOperator: IEmployeeOfOperator[];
    saveMeal: ISaveMealResponse | null;
}

export interface ISearchEmployeeProps {
    OperatorId: number;
    Date: string;
    Name?: string;
}

const initState: IEmployeeState = {
    loading: false,
    isSuccess: false,
    errorMessage: null,
    successMessage: null,
    error: null,
    employeeOfOperator: [],
    saveMeal: null,
};

const attendanceSlice = createSlice({
    name: 'attendance',
    initialState: initState,
    reducers: {
        getAllEmployee: (
            state,
            _action: PayloadAction<ISearchEmployeeProps>,
        ) => {
            state.loading = true;
        },
        getAllEmployeeSuccess: (
            state,
            action: PayloadAction<IEmployeeOfOperator[]>,
        ) => {
            // console.log(action.payload);
            state.loading = false;
            const empList = action.payload;
            empList.forEach(x => {
                const meal = x.employeeDate[0].meals[0];
                const objMeal = meal.information
                    ? JSON.parse(meal.information)
                    : { meal1: 0, meal2: 0 };
                meal.meal1 = objMeal.meal1;
                meal.meal2 = objMeal.meal2;
            });
            state.employeeOfOperator = empList;
        },
        saveMealInfomation: (
            state,
            _action: PayloadAction<ISaveMealPayload>,
        ) => {
            state.loading = true;
        },
        saveMealInfomationSuccess: (
            state,
            action: PayloadAction<ISaveMealResponse>,
        ) => {
            state.loading = false;
            state.saveMeal = action.payload;
        },
        // registerEmployee: (
        //     state,
        //     _action: PayloadAction<ISaveMealPayload>,
        // ) => {
        //     state.loading = true;
        // },
        saveCheckIn: (state, _action: PayloadAction<ISaveCheckInPayload[]>) => {
            state.loading = true;
        },
        saveCheckInSuccessfully: state => {
            state.loading = false;
        },
        unregisterFace: (
            state,
            _action: PayloadAction<IUnregisterFacePayload>,
        ) => {
            state.loading = true;
        },
        unregisterFaceSuccessfully: state => {
            state.loading = false;
        },
        saveCheckInFail: state => {
            state.loading = false;
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

const getAllEmployee$: RootEpic = action$ =>
    action$.pipe(
        filter(getAllEmployee.match),
        switchMap(re => {
            return AttendanceApi.getAllEmployees(re.payload).pipe(
                // delay(5000),
                concatMap((res: any) => {
                    return [attendanceSlice.actions.getAllEmployeeSuccess(res)];
                }),
                catchError((e: AjaxError) => [
                    attendanceSlice.actions.failRequest(
                        `Có lỗi xảy ra, vui lòng thử lại sau ${e.status}`,
                    ),
                ]),
            );
        }),
    );

const saveMealInfomation$: RootEpic = action$ =>
    action$.pipe(
        filter(saveMealInfomation.match),
        switchMap(action => {
            return AttendanceApi.saveMealInformation(
                action.payload.employeeDate,
            ).pipe(
                // mergeMap((profile: any) => {
                //     return [loginSlice.actions.updateProfileSuccess(profile)];
                // }),
                concatMap(() => {
                    console.log('thanhcong');
                    return [
                        getAllEmployee({
                            OperatorId: action.payload.operatorId,
                            Date: Utils.formatDateCallApi(new Date()),
                            Name: action.payload.searchName,
                        }),
                        // attendanceSlice.actions.saveMealInfomationSuccess(resp),
                        // getAllEmployee({
                        //     OperatorId: action.payload.operatorId,
                        //     Date: new Date().toISOString().split('T')[0],
                        // }),
                    ];
                }),
                catchError((_e: AjaxError) => [
                    attendanceSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );

// const registerFace$: RootEpic = action$ =>
//     action$.pipe(
//         filter(saveMealInfomation.match),
//         switchMap(action => {
//             return AttendanceApi.saveMealInformation(
//                 action.payload.employeeDate,
//             ).pipe(
//                 // mergeMap((profile: any) => {
//                 //     return [loginSlice.actions.updateProfileSuccess(profile)];
//                 // }),
//                 concatMap(() => {
//                     console.log('thanhcong');
//                     return [
//                         // attendanceSlice.actions.saveMealInfomationSuccess(resp),
//                         // getAllEmployee({
//                         //     OperatorId: action.payload.operatorId,
//                         //     Date: new Date().toISOString().split('T')[0],
//                         // }),
//                     ];
//                 }),
//                 catchError((_e: AjaxError) => [
//                     attendanceSlice.actions.failRequest(
//                         'Có lỗi xảy ra, vui lòng thử lại sau',
//                     ),
//                 ]),
//             );
//         }),
//     );

const saveCheckIn$: RootEpic = action$ =>
    action$.pipe(
        filter(saveCheckIn.match),
        switchMap(action => {
            return AttendanceApi.saveCheckIn(action.payload).pipe(
                // mergeMap((profile: any) => {
                //     return [loginSlice.actions.updateProfileSuccess(profile)];
                // }),
                concatMap(() => {
                    console.log('thanhcong');
                    return [
                        attendanceSlice.actions.saveCheckInSuccessfully(),
                        // getAllEmployee({
                        //     OperatorId: action.payload.operatorId,
                        //     Date: new Date().toISOString().split('T')[0],
                        // }),
                    ];
                }),
                catchError((_e: AjaxError) => [
                    attendanceSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                    attendanceSlice.actions.saveCheckInFail(),
                ]),
            );
        }),
    );

const unregisterFace$: RootEpic = action$ =>
    action$.pipe(
        filter(unregisterFace.match),
        switchMap(action => {
            return AttendanceApi.unregister(
                action.payload.unregisterEmployeeId,
            ).pipe(
                // mergeMap((profile: any) => {
                //     return [loginSlice.actions.updateProfileSuccess(profile)];
                // }),
                concatMap(() => {
                    console.log('thanhcong');
                    return [
                        attendanceSlice.actions.unregisterFaceSuccessfully(),
                        getEmployeesByOperatorId({
                            id: action.payload.seletedOperationId,
                            Name: action.payload.searchName,
                        }),
                        // getAllEmployee({
                        //     OperatorId: action.payload.operatorId,
                        //     Date: new Date().toISOString().split('T')[0],
                        // }),
                    ];
                }),
                catchError((_e: AjaxError) => [
                    attendanceSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                    attendanceSlice.actions.saveCheckInFail(),
                ]),
            );
        }),
    );

export const AttendanceEpics = [
    getAllEmployee$,
    saveMealInfomation$,
    saveCheckIn$,
    unregisterFace$,
];

export const {
    getAllEmployee,
    saveMealInfomation,
    saveCheckIn,
    unregisterFace,
} = attendanceSlice.actions;

export const attendanceReducer = attendanceSlice.reducer;
