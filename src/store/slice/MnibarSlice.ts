import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filter, switchMap, mergeMap, catchError } from 'rxjs';
import {
    ICreateMinibarService,
    IMinibarItem,
    IOrderedMinibarItem,
    RootEpic,
} from 'common/define-types';
import HotelServiceApi from 'api/hotel/service.api';
import { AjaxError } from 'rxjs/ajax';

export interface MinibarState {
    isLoading: boolean;
    isSubmitting: boolean;
    items: IMinibarItem[];
    orderedItems: IOrderedMinibarItem[];
}

const initialState: MinibarState = {
    isLoading: false,
    isSubmitting: false,
    items: [],
    orderedItems: [],
};

export const minibarSlice = createSlice({
    name: 'minibar',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        fetchMinibarItems: state => {
            state.isLoading = true;
        },
        setMinibarItems: (state, action: PayloadAction<IMinibarItem[]>) => {
            state.items = action.payload;
            state.orderedItems = action.payload.map(item => ({
                ...item,
                quantity: 0,
            }));
            state.isLoading = false;
        },
        addToOrder: (state, action: PayloadAction<IOrderedMinibarItem>) => {
            state.orderedItems = [...state.orderedItems, action.payload];
        },
        removeFromOrder: (
            state,
            action: PayloadAction<IOrderedMinibarItem>,
        ) => {
            state.orderedItems = state.orderedItems.filter(
                item => item.id === action.payload.id,
            );
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setItemQuantity: (
            state,
            action: PayloadAction<{ item: IMinibarItem; quantity: number }>,
        ) => {
            const item = action.payload.item;
            const quantity = action.payload.quantity;
            state.orderedItems = state.orderedItems.map(orderedItem =>
                orderedItem.id === item.id
                    ? { ...orderedItem, quantity }
                    : orderedItem,
            );
        },
        createMinibarItemsService: (
            state,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            action: PayloadAction<ICreateMinibarService>,
        ) => {
            state.isSubmitting = true;
        },
        setIsSubmitting: (state, action: PayloadAction<boolean>) => {
            state.isSubmitting = action.payload;
        },
        cleanOrder: state => {
            state.orderedItems = state.orderedItems.map(item => ({
                ...item,
                quantity: 0,
            }));
        },
    },
});

export const {
    fetchMinibarItems,
    addToOrder,
    removeFromOrder,
    setItemQuantity,
    createMinibarItemsService,
    setIsSubmitting,
    setMinibarItems,
    cleanOrder,
} = minibarSlice.actions;

const fetchMinibar$: RootEpic = action$ =>
    action$.pipe(
        filter(fetchMinibarItems.match),
        switchMap(() => {
            return HotelServiceApi.getMinibarItems().pipe(
                mergeMap((res: any) => {
                    if (res && !res?.response?.error) {
                        return [minibarSlice.actions.setMinibarItems(res)];
                    } else {
                        return [minibarSlice.actions.setMinibarItems([])];
                    }
                }),
                catchError((e: AjaxError) => {
                    console.log(e.request);
                    return [];
                }),
            );
        }),
    );
const createMinibarItemService$: RootEpic = (action$, state$) =>
    action$.pipe(
        filter(createMinibarItemsService.match),
        switchMap(re => {
            return HotelServiceApi.createMinibarService(re.payload).pipe(
                mergeMap((res: any) => {
                    if (res && !res?.response?.error) {
                        return [
                            minibarSlice.actions.setMinibarItems(
                                state$.value.minibar.items,
                            ),
                        ];
                    } else {
                        return [minibarSlice.actions.setIsSubmitting(false)];
                    }
                }),
                catchError((e: AjaxError) => {
                    console.log(e);
                    return [minibarSlice.actions.setIsSubmitting(false)];
                }),
            );
        }),
    );
export const MinibarEpics = [fetchMinibar$, createMinibarItemService$];
export const minibarReducer = minibarSlice.reducer;
