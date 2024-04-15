import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import EmployeeApi from 'api/employee/employee.api';
import { IProfile, RootEpic } from 'common/define-types';
import { catchError, concatMap, filter, switchMap } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { getListOCByDepartId } from './AdminEpic';

export interface IError {
    statusCode: number;
    errorCode: number;
    message: string;
}

export interface IJob {
    id: number;
    employeeId: number;
    categoryId: number;
    startDate: Date;
    endDate: Date;
    location: string;
    salary: number;
    specification: string;
    status: number;
    supervisorId: number;
    titleId: number;
}
export interface IContractDetail {
    employeeId: 0;
    mask: 0;
    addressStreet1: string;
    addressStreet2: string;
    city: string;
    country: string;
    homePhone: string;
    mobile: string;
    otherEmail: string;
    workEmail: string;
    workPhone: string;
    zipCode: string;
}
export interface IEmployeeInfo {
    id: number;
    tingId: string;
    dateOfBirth: Date;
    departmentId: number;
    startDate: Date;
    endDate: Date;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    homeTown: string;
    identity: string;
    maritalStatus: string;
    nationality: string;
    picture: string;
    status: 0;
    mood: string;
    contactDetail: IContractDetail;
    companies: number[];
    jobs: IJob[];
}

export interface IEmployeeState {
    loading: boolean;
    isSubmittingProfile: boolean;
    isSuccess: boolean;
    errorMessage: string | null;
    successMessage: string | null;
    error: IError | null;
    employeeInfo: IEmployeeInfo | null;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IUpdateProfile {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    homeTown: string;
}

const initState: IEmployeeState = {
    loading: false,
    isSubmittingProfile: false,
    isSuccess: false,
    errorMessage: null,
    successMessage: null,
    error: null,
    employeeInfo: null,
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState: initState,
    reducers: {
        getEmployeeInfo: (state, _action: PayloadAction<void>) => {
            state.loading = true;
        },
        getEmployeeInfoSuccess: (state, action: PayloadAction<any>) => {
            console.log('profile: ', action.payload);
            state.loading = false;
            state.isSubmittingProfile = false;
            state.employeeInfo = action.payload;
        },
        updateInfo: (state, _action: PayloadAction<IProfile>) => {
            state.isSubmittingProfile = true;
        },
        error(state, action: PayloadAction<IError>) {
            state.loading = false;
            state.error = action.payload;
        },
        failRequest: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.isSubmittingProfile = false;
            state.errorMessage = action.payload;
        },
    },
});

const getEmployeeInfo$: RootEpic = action$ =>
    action$.pipe(
        filter(getEmployeeInfo.match),
        switchMap(_re => {
            return EmployeeApi.getEmployeeInfo().pipe(
                concatMap((res: any) => {
                    return [
                        employeeSlice.actions.getEmployeeInfoSuccess(res),
                        getListOCByDepartId(res.departmentId),
                    ];
                }),
                catchError((_e: AjaxError) => [
                    employeeSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );

const updateInfo$: RootEpic = action$ =>
    action$.pipe(
        filter(updateInfo.match),
        switchMap(_re => {
            return EmployeeApi.updateEmployeeInfo(_re.payload).pipe(
                concatMap((res: any) => {
                    if (res) {
                        return [employeeSlice.actions.getEmployeeInfo()];
                    }
                    return [
                        employeeSlice.actions.failRequest(
                            'Lưu thông tin không thành công',
                        ),
                    ];
                }),
                catchError((_e: AjaxError) => {
                    return [
                        employeeSlice.actions.failRequest(
                            'Có lỗi xảy ra khi lưu thông tin, vui lòng thử lại sau',
                        ),
                    ];
                }),
            );
        }),
    );

export const EmployeeEpics = [getEmployeeInfo$, updateInfo$];

export const { getEmployeeInfo, updateInfo, failRequest } =
    employeeSlice.actions;

export const employeeReducer = employeeSlice.reducer;
