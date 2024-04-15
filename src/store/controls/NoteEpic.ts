import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import NoteApi from 'api/note/note.api';
import { RootEpic } from 'common/define-types';
import { catchError, concatMap, filter, switchMap } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { getAllEmployee } from './AttendanceEpic';
import Utils from 'common/Utils';

export interface IError {
    statusCode: number;
    errorCode: number;
    message: string;
}

export interface ICreateNotePayload {
    searchName?: string;
    seletedOperationId: number;
    employeeFaceId: string;
    employeeDateId: string;
    date: string;
    content: string;
}
export interface IUpdateNotePayload {
    searchName?: string;
    body: {
        employeeDateId: string;
        content: string;
    };
    id: string;
    seletedOperationId: number;
}

export interface INote {
    id?: string;
    employeeDateId: string;
    content: string;
}

export interface INoteState {
    loading: boolean;
    isSuccess: boolean;
    errorMessage: string | null;
    successMessage: string | null;
    error: IError | null;
    allNotes: INote[];
    createdNote: INote | null;
    updatedNote: INote | null;
}

const initState: INoteState = {
    loading: false,
    isSuccess: false,
    errorMessage: null,
    successMessage: null,
    error: null,
    allNotes: [],
    createdNote: null,
    updatedNote: null,
};

const noteSlice = createSlice({
    name: 'note',
    initialState: initState,
    reducers: {
        getAllNotes: (state, _action: PayloadAction<any>) => {
            state.loading = true;
        },
        getAllNoteSuccess: (state, action: PayloadAction<INote[]>) => {
            // console.log(action.payload);
            state.loading = false;
            state.allNotes = action.payload;
        },
        createNote: (state, _action: PayloadAction<ICreateNotePayload>) => {
            state.loading = true;
        },
        createNoteSuccessfully: (state, action: PayloadAction<INote>) => {
            // console.log(action.payload);
            state.loading = false;
            state.createdNote = action.payload;
        },
        updateNote: (state, _action: PayloadAction<IUpdateNotePayload>) => {
            state.loading = true;
        },
        updateNoteSuccessfully: (state, action: PayloadAction<INote>) => {
            // console.log(action.payload);
            state.loading = false;
            state.createdNote = action.payload;
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

const getAllNotes$: RootEpic = action$ =>
    action$.pipe(
        filter(getAllNotes.match),
        switchMap(_action => {
            return NoteApi.getAllNotes().pipe(
                concatMap((res: any) => {
                    return [noteSlice.actions.getAllNoteSuccess(res)];
                }),
                catchError((e: AjaxError) => [
                    noteSlice.actions.failRequest(
                        `Có lỗi xảy ra, vui lòng thử lại sau ${e.status}`,
                    ),
                ]),
            );
        }),
    );

const createNote$: RootEpic = action$ =>
    action$.pipe(
        filter(createNote.match),
        switchMap(action => {
            return NoteApi.createNote(action.payload).pipe(
                // mergeMap((profile: any) => {
                //     return [loginSlice.actions.updateProfileSuccess(profile)];
                // }),
                concatMap((_res: any) => {
                    console.log('thanhcong');
                    return [
                        getAllEmployee({
                            OperatorId: action.payload.seletedOperationId,
                            Date: Utils.formatDateCallApi(new Date()),
                            Name: action.payload.searchName,
                        }),
                        // noteSlice.actions.createNoteSuccessfully(res),
                        // attendanceSlice.actions.saveMealInfomationSuccess(resp),
                        // getAllEmployee({
                        //     OperatorId: action.payload.operatorId,
                        //     Date: new Date().toISOString().split('T')[0],
                        // }),
                    ];
                }),
                catchError((e: AjaxError) => {
                    console.log(e.message, 'error');
                    return [
                        noteSlice.actions.failRequest(
                            'Có lỗi xảy ra, vui lòng thử lại sau',
                        ),
                    ];
                }),
            );
        }),
    );

const updateNote$: RootEpic = action$ =>
    action$.pipe(
        filter(updateNote.match),
        switchMap(action => {
            return NoteApi.updateNote(
                {
                    employeeDateId: action.payload.body.employeeDateId,
                    content: action.payload.body.content,
                },
                action.payload.id,
            ).pipe(
                // mergeMap((profile: any) => {
                //     return [loginSlice.actions.updateProfileSuccess(profile)];
                // }),
                concatMap((res: any) => {
                    console.log('thanhcong');
                    return [
                        noteSlice.actions.updateNoteSuccessfully(res),
                        getAllEmployee({
                            OperatorId: action.payload.seletedOperationId,
                            Date: new Date().toISOString().split('T')[0],
                            Name: action.payload.searchName,
                        }),
                        // attendanceSlice.actions.saveMealInfomationSuccess(resp),
                        // getAllEmployee({
                        //     OperatorId: action.payload.operatorId,
                        //     Date: new Date().toISOString().split('T')[0],
                        // }),
                    ];
                }),
                catchError((e: AjaxError) => {
                    console.log(e.message, 'error');
                    return [
                        noteSlice.actions.failRequest(
                            'Có lỗi xảy ra, vui lòng thử lại sau',
                        ),
                    ];
                }),
            );
        }),
    );

export const NoteEpics = [getAllNotes$, createNote$, updateNote$];

export const { getAllNotes, createNote, updateNote } = noteSlice.actions;

export const noteReducer = noteSlice.reducer;
