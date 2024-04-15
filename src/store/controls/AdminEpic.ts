import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import AdminApi from 'api/admin/admin.api';
import { RootEpic } from 'common/define-types';
import { catchError, filter, mergeMap, switchMap } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

export interface IError {
    statusCode: number;
    errorCode: number;
    message: string;
}

export interface IJobCategory {
    id: number;
    desc: string;
    name: string;
    companyId: number;
    departmentId: number;
    nameEN: string;
}

export interface IJobTitle {
    id: number;
    desc: string;
    name: string;
    nameEN: string;
    companyId: number;
}

export interface IDepartment {
    id: number;
    name: string;
    note: string;
    operationCenterId: number;
    operationCenterName: string;
    nameEN: string;
}

export interface IBuildingBlock {
    id: number;
    operationCenterId: number;
    name: string;
    note: string;
}

export interface ICompany {
    id: number;
    mask: number;
    alias: string;
    fullName: string;
    logo: string;
    note: string;
    address: string;
    registerDate: Date;
    activeDate: Date;
    outDate: Date;
}

export interface IOperationCenterByDepartmentId {
    id: number;
    name: string;
    location: string;
    note: string;
    hotline: 'string';
    managerId: 'string';
    company: ICompany;
    buildingBlocks: IBuildingBlock[];
    departments: IDepartment[];
    jobTitles: IJobTitle[];
    jobCategories: IJobCategory[];
    index: number;
}

export interface IAdminState {
    loading: boolean;
    isSuccess: boolean;
    errorMessage: string | null;
    successMessage: string | null;
    error: IError | null;
    listOperationByDepartmentId: IOperationCenterByDepartmentId[];
}

const initState: IAdminState = {
    loading: false,
    isSuccess: false,
    errorMessage: null,
    successMessage: null,
    error: null,
    listOperationByDepartmentId: [],
};

const adminSlice = createSlice({
    name: 'admin',
    initialState: initState,
    reducers: {
        getListOCByDepartId: (state, _action: PayloadAction<number>) => {
            state.loading = true;
        },
        getListOCByDepartIdSuccess: (state, action: PayloadAction<any>) => {
            // console.log(action.payload);
            state.loading = false;
            const hotelNames = [
                'Maydeville Hotel Old Quater',
                'Maydeville Luxury',
                'Maydeville  Premium Hotel',
                'Maydeville Hotel Gia Ngu Hotel & Spa',
            ];
            state.listOperationByDepartmentId = action.payload
                .slice(0, 4)
                .map((operator: any, index: number) => ({
                    ...operator,
                    name: hotelNames[index],
                    index: index + 1,
                }));
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

const getListOCByDepartId$: RootEpic = action$ =>
    action$.pipe(
        filter(getListOCByDepartId.match),
        switchMap(re => {
            return AdminApi.getListOperatorCenterByDepartmentId(
                re.payload,
            ).pipe(
                mergeMap((res: any) => {
                    return [adminSlice.actions.getListOCByDepartIdSuccess(res)];
                }),
                catchError((_e: AjaxError) => [
                    adminSlice.actions.failRequest(
                        'Có lỗi xảy ra, vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );

export const AdminEpics = [getListOCByDepartId$];

export const { getListOCByDepartId } = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
