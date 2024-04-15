import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IdentifyApi from 'api/scan/identify.api';
import { filter, switchMap, mergeMap, catchError } from 'rxjs';
import {
    IdentifyType,
    IScanInfor,
    IUpdateGuestIdentity,
    RootEpic,
    ScanResultStatus,
} from 'common/define-types';
import { AjaxError } from 'rxjs/ajax';

export interface ScanState {
    isSubmitting: boolean;
    selectedType: IdentifyType | null;
    scanInfor: IScanInfor | null;
    scanResultStatus: ScanResultStatus | null;
}

const initialState: ScanState = {
    isSubmitting: false,
    selectedType: null,
    scanInfor: null,
    scanResultStatus: null,
};

export const scanSlice = createSlice({
    name: 'scan',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setSelectedType: (state, action: PayloadAction<IdentifyType>) => {
            state.selectedType = action.payload;
        },
        setScanInfor: (state, action: PayloadAction<IScanInfor | null>) => {
            state.scanInfor = action.payload;
        },
        setScanResultStatus: (
            state,
            action: PayloadAction<ScanResultStatus | null>,
        ) => {
            state.scanResultStatus = action.payload;
        },
        updateIdentity: (
            state,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            action: PayloadAction<IUpdateGuestIdentity>,
        ) => {
            state.scanResultStatus = ScanResultStatus.LOADING;
        },
    },
});

export const { setSelectedType, setScanInfor, updateIdentity } =
    scanSlice.actions;

const updateIdentity$: RootEpic = action$ =>
    action$.pipe(
        filter(updateIdentity.match),
        switchMap(re => {
            return IdentifyApi.updateGuestIdentity(re.payload).pipe(
                mergeMap((res: any) => {
                    if (res && !res?.response?.error) {
                        return [
                            scanSlice.actions.setScanResultStatus(
                                ScanResultStatus.SUCCESS,
                            ),
                        ];
                    } else {
                        return [
                            scanSlice.actions.setScanResultStatus(
                                ScanResultStatus.ERROR,
                            ),
                        ];
                    }
                }),
                catchError((e: AjaxError) => {
                    console.log(e.response);
                    return [
                        scanSlice.actions.setScanResultStatus(
                            ScanResultStatus.ERROR,
                        ),
                    ];
                }),
            );
        }),
    );
export const ScanEpics = [updateIdentity$];
export const scanReducer = scanSlice.reducer;
