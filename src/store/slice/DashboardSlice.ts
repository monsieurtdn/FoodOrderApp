import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import HotelServiceApi from 'api/hotel/service.api';
import { IFloor, ITotal, RootEpic } from 'common/define-types';
import { catchError, filter, mergeMap, switchMap } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
export interface DashboardState {
    isLoading: boolean;
    isSubmitting: boolean;
    floors: IFloor[];
    allFloors: ITotal;
}
const initialState: DashboardState = {
    isLoading: false,
    isSubmitting: false,
    floors: [],
    allFloors: {
        room: 5,
        oc: 1,
        od: 1,
        vc: 1,
        vd: 1,
        vci: 1,
    },
};

export const DashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchFloors: state => {
            state.isLoading = true;
        },
        setFloors: (state, action: PayloadAction<IFloor[]>) => {
            state.floors = action.payload;
            state.isLoading = false;
        },
        fetchTotal: state => {
            state.isLoading = true;
        },
        setTotal: (state, action: PayloadAction<ITotal>) => {
            state.allFloors = action.payload;
            state.isLoading = false;
        },
    },
});

export const { fetchFloors, setFloors, fetchTotal, setTotal } =
    DashboardSlice.actions;

const fetchFloors$: RootEpic = (action$, state$) =>
    action$.pipe(
        filter(fetchFloors.match),
        switchMap(() => {
            return HotelServiceApi.getFloors(
                state$.value.home.businessDate,
            ).pipe(
                mergeMap((res: any) => {
                    if (res && !res?.response?.error) {
                        return [DashboardSlice.actions.setFloors(res)];
                    } else {
                        return [DashboardSlice.actions.setFloors([])];
                    }
                }),
                catchError((e: AjaxError) => {
                    console.log(e.request);
                    console.log(e.response);
                    return [DashboardSlice.actions.setFloors([])];
                }),
            );
        }),
    );
const fetchTotal$: RootEpic = (action$, state$) =>
    action$.pipe(
        filter(fetchTotal.match),
        switchMap(() => {
            return HotelServiceApi.getAllFloors(
                state$.value.home.businessDate,
            ).pipe(
                mergeMap((res: any) => {
                    if (res && !res?.response?.error) {
                        return [DashboardSlice.actions.setTotal(res)];
                    } else {
                        return [
                            DashboardSlice.actions.setTotal({
                                room: 5,
                                oc: 1,
                                od: 1,
                                vd: 1,
                                vc: 1,
                                vci: 1,
                            }),
                        ];
                    }
                }),
                catchError((e: AjaxError) => {
                    console.log(e.request);
                    console.log(e.response);
                    return [
                        DashboardSlice.actions.setTotal({
                            room: 5,
                            oc: 1,
                            od: 1,
                            vd: 1,
                            vc: 1,
                            vci: 1,
                        }),
                    ];
                }),
            );
        }),
    );
export const DashBoardEpics = [fetchFloors$, fetchTotal$];
export const DashboardReducer = DashboardSlice.reducer;
