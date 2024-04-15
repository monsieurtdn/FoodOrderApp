import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IOperationCenterByDepartmentId } from './AdminEpic';
import { IEmployeeByOperatorId } from './OperatorsEpic';

export interface IEmployeeFaceId {
    id: string;
    employeeId: number;
    employeeCode: string;
    awsUserId: string;
    name: string;
    role: string;
    jobTitle: string;
    operatorId: string;
}
export interface IFaceCheckInResponse {
    employeeFaceIds: IEmployeeFaceId[];
    imageUrl: string;
}
interface IHomeState {
    clickedShift: number;
    operationCenterList: IOperationCenterByDepartmentId[] | null;
    seletedOperation: IOperationCenterByDepartmentId | null;
    takenRegisterPhoto: any;
    registerForm: any;
    selectedRegisterEmployee: IEmployeeByOperatorId | null;
    takenFaceCheckInPhoto: any;
    faceCheckInRespone: IFaceCheckInResponse | null;
    isRetakeImage: boolean;
    businessDate: string;
}

const initState: IHomeState = {
    clickedShift: 0,
    operationCenterList: [],
    seletedOperation: null,
    takenRegisterPhoto: null,
    registerForm: null,
    selectedRegisterEmployee: null,
    takenFaceCheckInPhoto: null,
    faceCheckInRespone: null,
    isRetakeImage: false,
    businessDate: '',
};

const homeSlice = createSlice({
    name: 'home',
    initialState: initState,
    reducers: {
        setShift: (state, action: PayloadAction<number>) => {
            state.clickedShift = action.payload;
        },
        setOperationCenterList: (
            state,
            action: PayloadAction<IOperationCenterByDepartmentId[]>,
        ) => {
            state.operationCenterList = action.payload;
        },
        setSelectedOpeationCenter: (
            state,
            action: PayloadAction<IOperationCenterByDepartmentId>,
        ) => {
            state.seletedOperation = action.payload;
        },
        setTakenRegisterPhoto: (state, action: PayloadAction<any>) => {
            state.takenRegisterPhoto = action.payload;
        },
        setRegisterForm: (state, action: PayloadAction<any>) => {
            state.registerForm = action.payload;
        },
        setSelectedRegisterEmployee: (
            state,
            action: PayloadAction<IEmployeeByOperatorId>,
        ) => {
            state.selectedRegisterEmployee = action.payload;
        },
        setTakenFaceCheckInPhoto: (state, action: PayloadAction<any>) => {
            state.takenFaceCheckInPhoto = action.payload;
        },
        setFaceCheckInRespone: (
            state,
            action: PayloadAction<IFaceCheckInResponse>,
        ) => {
            state.faceCheckInRespone = action.payload;
        },
        setIsRetakeImage: (state, action: PayloadAction<boolean>) => {
            state.isRetakeImage = action.payload;
        },
        setBusinessDate: (state, action: PayloadAction<string>) => {
            state.businessDate = action.payload;
        },
    },
});

export const {
    setShift,
    setOperationCenterList,
    setSelectedOpeationCenter,
    setTakenRegisterPhoto,
    setRegisterForm,
    setSelectedRegisterEmployee,
    setTakenFaceCheckInPhoto,
    setFaceCheckInRespone,
    setIsRetakeImage,
    setBusinessDate,
} = homeSlice.actions;

export const homeReducer = homeSlice.reducer;
