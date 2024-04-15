import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import CameraAPI, {
    DetectPersonResponse,
    PersonResponse,
    RegisterPersonResponse,
} from 'api/camera.api';
import { Asset } from 'react-native-image-picker';
import { catchError, filter, mergeMap, switchMap, timer } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { RootEpic } from '../../common/define-types';
export interface Step {
    title: string;
    name: string;
    key: number;
    image?: Asset;
}
export const Steps: Step[] = [
    {
        title: 'Chụp hình chính diện khuôn mặt',
        name: 'front',
        key: 0,
    },
    {
        title: 'Chụp hình khuôn mặt nghiêng bên trái',
        name: 'left',
        key: 1,
    },
    {
        title: 'Chụp hình khuôn mặt nghiêng bên phải',
        name: 'right',
        key: 2,
    },
    {
        title: 'Chụp hình khuôn mặt hướng lên',
        name: 'up',
        key: 4,
    },
    {
        title: 'Chụp hình khuôn mặt hướng xuống',
        name: 'down',
        key: 5,
    },
];
export interface PersonState {
    loading: boolean;
    PersonData: PersonResponse | null;
    detectPerson: DetectPersonResponse | null;
    StepData: Step[];
    currentStep: Step | null;
    registerName: string | null;
    errorMessage: string | null;
    RegisterPersonData: RegisterPersonResponse | null;
    DetectPersonData: RegisterPersonResponse | null;
}

const initState: PersonState = {
    loading: false,
    PersonData: null,
    errorMessage: null,
    StepData: [],
    currentStep: null,
    registerName: null,
    detectPerson: null,
    RegisterPersonData: null,
    DetectPersonData: null,
};
const PersonSlice = createSlice({
    name: 'Person',
    initialState: initState,
    reducers: {
        createPerson(
            state,
            action: PayloadAction<{ name: string; body: any }>,
        ) {
            state.loading = true;
        },
        checkPerson(state, action: PayloadAction<{ body: any }>) {
            state.loading = true;
        },
        getPersonSuccess(state, action: PayloadAction<PersonResponse | null>) {
            state.loading = false;
            state.PersonData = action.payload;
            state.errorMessage = null;
        },
        registerPerson(
            state,
            action: PayloadAction<{ name: string; body: any }>,
        ) {
            state.loading = true;
        },
        attendancePerson(
            state,
            action: PayloadAction<{ name: string; body: any }>,
        ) {
            state.loading = true;
        },
        registerPersonSuccess(
            state,
            action: PayloadAction<RegisterPersonResponse | null>,
        ) {
            state.loading = false;
            state.RegisterPersonData = action.payload;
        },
        detectPersonSuccess(
            state,
            action: PayloadAction<RegisterPersonResponse | null>,
        ) {
            state.loading = false;
            state.DetectPersonData = action.payload;
        },
        checkPersonSuccess(state, action: PayloadAction<DetectPersonResponse>) {
            state.loading = false;
            state.detectPerson = action.payload;
            state.errorMessage = null;
            state.errorMessage = null;
        },
        failRequest(state, action: PayloadAction<string>) {
            state.loading = false;
            state.errorMessage = action.payload;
        },
        nextStep(
            state,
            action: PayloadAction<{
                currentStep: Step | null;
                nextStep: Step | null;
            }>,
        ) {
            if (action.payload.currentStep) {
                var data = state.StepData.map(x => ({ ...x }));
                var step = action.payload.currentStep.key ?? 0;
                data[step] = action.payload.currentStep;
                state.StepData = data;
            }
            state.currentStep = action.payload.nextStep;
        },
        setRegisterName(state, action: PayloadAction<string | null>) {
            state.registerName = action.payload;
        },
    },
});

const CreatePerson$: RootEpic = action$ =>
    action$.pipe(
        filter(createPerson.match),
        switchMap(re => {
            return CameraAPI.create(re.payload.name, re.payload.body).pipe(
                mergeMap((res: any) => {
                    return [PersonSlice.actions.getPersonSuccess(res)];
                }),
                catchError((e: AjaxError) => [
                    PersonSlice.actions.failRequest(
                        'Có lỗi xảy ra vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );
const CheckPerson$: RootEpic = action$ =>
    action$.pipe(
        filter(checkPerson.match),
        switchMap(re => {
            return CameraAPI.detect(re.payload.body).pipe(
                mergeMap((res: DetectPersonResponse) => {
                    return timer(2000).pipe(
                        mergeMap(() => {
                            return CameraAPI.getResult(res.id).pipe(
                                mergeMap((res2: DetectPersonResponse) => {
                                    return [
                                        PersonSlice.actions.checkPersonSuccess(
                                            res2,
                                        ),
                                    ];
                                }),
                                catchError((e: AjaxError) => [
                                    PersonSlice.actions.failRequest(
                                        'Có lỗi xảy ra vui lòng thử lại sau',
                                    ),
                                ]),
                            );
                        }),
                    );
                }),
                catchError((e: AjaxError) => [
                    PersonSlice.actions.failRequest(
                        'Có lỗi xảy ra vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );
const registerPerson$: RootEpic = action$ =>
    action$.pipe(
        filter(registerPerson.match),
        switchMap(re => {
            return CameraAPI.register(re.payload.name, re.payload.body).pipe(
                mergeMap((res: RegisterPersonResponse) => {
                    return [PersonSlice.actions.registerPersonSuccess(res)];
                }),
                catchError((e: AjaxError) => [
                    PersonSlice.actions.failRequest(
                        'Có lỗi xảy ra vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );
const attendancePerson$: RootEpic = action$ =>
    action$.pipe(
        filter(attendancePerson.match),
        switchMap(re => {
            return CameraAPI.attendance(re.payload.name, re.payload.body).pipe(
                mergeMap((res: RegisterPersonResponse) => {
                    return [PersonSlice.actions.detectPersonSuccess(res)];
                }),
                catchError((e: AjaxError) => [
                    PersonSlice.actions.failRequest(
                        'Có lỗi xảy ra vui lòng thử lại sau',
                    ),
                ]),
            );
        }),
    );

export const PersonEpics = [
    CreatePerson$,
    CheckPerson$,
    registerPerson$,
    attendancePerson$,
];
export const {
    createPerson,
    getPersonSuccess,
    checkPerson,
    nextStep,
    setRegisterName,
    registerPerson,
    attendancePerson,
    registerPersonSuccess,
    detectPersonSuccess,
} = PersonSlice.actions;
export const PersonReducer = PersonSlice.reducer;
