import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import HotelServiceApi from 'api/hotel/service.api';
import {
    IFloor,
    InspectedStatus,
    IRoom,
    IUpdateRoom,
    IUpdateRoomByFloor,
    RootEpic,
    ITotal,
} from 'common/define-types';
import Utils from 'common/Utils';
import { catchError, filter, mergeMap, switchMap } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

export interface HotelState {
    isLoading: boolean;
    isFloorLoading: boolean;
    isSubmitting: boolean;
    floors: IFloor[];
    floorSelected: IFloor | null;
    rooms: IRoom[];
    roomSelected: IRoom | null;
    totalFloor: ITotal;
}

const initialState: HotelState = {
    isLoading: false,
    isFloorLoading: false,
    isSubmitting: false,
    floors: [],
    floorSelected: null,
    rooms: [],
    roomSelected: null,
    totalFloor: {
        room: 5,
        oc: 1,
        od: 1,
        vc: 1,
        vd: 1,
        vci: 1,
    },
};

export const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        fetchRooms: state => {
            state.isLoading = true;
        },
        setRooms: (state, action: PayloadAction<IRoom[]>) => {
            state.rooms = action.payload;
            state.isLoading = false;
        },
        setZoneSelected: (state, action: PayloadAction<IFloor | null>) => {
            state.floorSelected = action.payload;
        },
        setRoomSelected: (state, action: PayloadAction<IRoom | null>) => {
            state.roomSelected = action.payload;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        updateRoomStatus: (state, action: PayloadAction<IUpdateRoom>) => {
            state.isSubmitting = true;
        },
        updateRoomStatusByFloor: (
            state,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            action: PayloadAction<IUpdateRoomByFloor>,
        ) => {
            state.isSubmitting = true;
        },
        updateRoomStatusSuccess: (
            state,
            action: PayloadAction<IUpdateRoom>,
        ) => {
            const payload = action.payload;
            state.isSubmitting = false;
            state.rooms = state.rooms.map(room =>
                room.roomNo === payload.id
                    ? {
                          ...room,
                          vci: payload.inspected
                              ? InspectedStatus.TRUE
                              : InspectedStatus.FALSE,
                          roomStatusCode: Utils.toNewRoomStatus(
                              room.roomStatusCode,
                              payload.status,
                          ),
                      }
                    : room,
            );
        },
        updateRoomStatusByFloorSuccess: (
            state,
            action: PayloadAction<IUpdateRoomByFloor>,
        ) => {
            const payload = action.payload;
            state.isSubmitting = false;
            state.rooms = state.rooms.map(room =>
                room.floorNo === payload.id
                    ? {
                          ...room,
                          roomStatusCode: Utils.toNewRoomStatus(
                              room.roomStatusCode,
                              payload.status,
                          ),
                      }
                    : room,
            );
        },
        setIsSubmitting: (state, action: PayloadAction<boolean>) => {
            state.isSubmitting = action.payload;
        },
        fetchFloors: state => {
            state.isFloorLoading = true;
        },
        setFloors: (state, action: PayloadAction<IFloor[]>) => {
            state.floors = action.payload;
            state.isFloorLoading = false;
        },
        fetchTotal: state => {
            state.isFloorLoading = true;
        },
        setTotal: (state, action: PayloadAction<ITotal>) => {
            state.totalFloor = action.payload;
            state.isFloorLoading = false;
        },
    },
});

export const {
    fetchRooms,
    setRooms,
    setZoneSelected,
    setRoomSelected,
    updateRoomStatus,
    setIsSubmitting,
    updateRoomStatusByFloor,
    fetchFloors,
    fetchTotal,
    setFloors,
    setTotal,
} = hotelSlice.actions;

const fetchRooms$: RootEpic = (action$, state$) =>
    action$.pipe(
        filter(fetchRooms.match),
        switchMap(() => {
            return HotelServiceApi.getRooms(
                state$.value.home.businessDate,
            ).pipe(
                mergeMap((res: any) => {
                    console.log(res);
                    if (res && !res?.response?.error) {
                        return [hotelSlice.actions.setRooms(res)];
                    } else {
                        return [hotelSlice.actions.setRooms([])];
                    }
                }),
                catchError((e: AjaxError) => {
                    console.log(e.request);
                    console.log(e.response);
                    return [hotelSlice.actions.setRooms([])];
                }),
            );
        }),
    );
const updateRoomStatus$: RootEpic = action$ =>
    action$.pipe(
        filter(updateRoomStatus.match),
        switchMap(re => {
            console.log(re.payload);

            return HotelServiceApi.updateRoomByNo(re.payload).pipe(
                mergeMap(() => {
                    return [
                        hotelSlice.actions.updateRoomStatusSuccess(re.payload),
                        hotelSlice.actions.fetchFloors(),
                    ];
                }),
                catchError((e: AjaxError) => {
                    console.log(e.request);
                    console.log(e.response);
                    return [hotelSlice.actions.setIsSubmitting(false)];
                }),
            );
        }),
    );
const updateRoomStatusByFloor$: RootEpic = action$ =>
    action$.pipe(
        filter(updateRoomStatusByFloor.match),
        switchMap(re => {
            return HotelServiceApi.updateRoomsStatusByFloorNo(re.payload).pipe(
                mergeMap(() => {
                    return [
                        hotelSlice.actions.updateRoomStatusByFloorSuccess(
                            re.payload,
                        ),
                        hotelSlice.actions.fetchFloors(),
                    ];
                }),
                catchError((e: AjaxError) => {
                    console.log(e.request);
                    console.log(e.response);
                    return [hotelSlice.actions.setIsSubmitting(false)];
                }),
            );
        }),
    );
const fetchFloors$: RootEpic = (action$, state$) =>
    action$.pipe(
        filter(fetchFloors.match),
        switchMap(() => {
            return HotelServiceApi.getFloors(
                state$.value.home.businessDate,
            ).pipe(
                mergeMap((res: any) => {
                    if (res && !res?.response?.error) {
                        return [hotelSlice.actions.setFloors(res)];
                    } else {
                        return [hotelSlice.actions.setFloors([])];
                    }
                }),
                catchError((e: AjaxError) => {
                    console.log(e.request);
                    console.log(e.response);
                    return [hotelSlice.actions.setFloors([])];
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
                        return [hotelSlice.actions.setTotal(res)];
                    } else {
                        return [
                            hotelSlice.actions.setTotal({
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
                        hotelSlice.actions.setTotal({
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
export const HotelEpics = [
    fetchRooms$,
    updateRoomStatus$,
    updateRoomStatusByFloor$,
    fetchFloors$,
    fetchTotal$,
];
export const hotelReducer = hotelSlice.reducer;
