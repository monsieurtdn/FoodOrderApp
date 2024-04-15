import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { catchError, filter, mergeMap, switchMap } from 'rxjs';
import {
    ICreateLaundryService,
    ILaundryItem,
    IOrderedLaundryItem,
    LaundryType,
    RootEpic,
} from 'common/define-types';
import HotelServiceApi from 'api/hotel/service.api';
import { AjaxError } from 'rxjs/ajax';
import Utils from 'common/Utils';

export interface LaundryState {
    isLoading: boolean;
    isSubmitting: boolean;
    items: ILaundryItem[];
    orderedItems: IOrderedLaundryItem[];
}

const initialState: LaundryState = {
    isLoading: false,
    isSubmitting: false,
    items: [],
    orderedItems: [],
};

export const laundrySlice = createSlice({
    name: 'laundry',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        fetchLaundry: state => {
            state.isLoading = true;
        },
        addToOrder: (state, action: PayloadAction<IOrderedLaundryItem>) => {
            state.orderedItems = [...state.orderedItems, action.payload];
        },
        removeFromOrder: (
            state,
            action: PayloadAction<IOrderedLaundryItem>,
        ) => {
            state.orderedItems = state.orderedItems.filter(
                item =>
                    item.id === action.payload.id &&
                    item.type === action.payload.type,
            );
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setItemQuantity: (
            state,
            action: PayloadAction<{
                item: IOrderedLaundryItem;
                quantity: number;
            }>,
        ) => {
            const item = action.payload.item;
            const quantity = action.payload.quantity;
            state.orderedItems = state.orderedItems.map(orderedItem =>
                orderedItem.id === item.id && orderedItem.type === item.type
                    ? { ...orderedItem, quantity }
                    : orderedItem,
            );
        },
        setLaundryItems: (state, action: PayloadAction<ILaundryItem[]>) => {
            state.items = action.payload;
            const laundryTypes: {
                name: LaundryType;
                priceKey: keyof ILaundryItem;
            }[] = [
                {
                    name: LaundryType.LAUNDRY,
                    priceKey: 'laundryVND',
                },
                {
                    name: LaundryType.DRY,
                    priceKey: 'dryCleaningVND',
                },
                {
                    name: LaundryType.PRESSING,
                    priceKey: 'pressingOnlyVND',
                },
            ];
            let newOrderedItems: IOrderedLaundryItem[] = [];
            laundryTypes.forEach(type => {
                const orderedItemsByType = Utils.mapLaundryArray(
                    action.payload,
                    type.priceKey,
                    'donGia',
                    type.name,
                );
                newOrderedItems = newOrderedItems.concat(orderedItemsByType);
            });
            state.orderedItems = newOrderedItems.map(item => ({
                ...item,
                quantity: 0,
            }));
            state.isLoading = false;
        },
        createLaundryService: (
            state,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            action: PayloadAction<ICreateLaundryService>,
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
    addToOrder,
    removeFromOrder,
    setItemQuantity,
    fetchLaundry,
    setLaundryItems,
    createLaundryService,
    cleanOrder,
} = laundrySlice.actions;

const fetchLaundry$: RootEpic = action$ =>
    action$.pipe(
        filter(fetchLaundry.match),
        switchMap(() => {
            return HotelServiceApi.getDryCleaningItems().pipe(
                mergeMap((res: any) => {
                    if (res && !res?.response?.error) {
                        return [laundrySlice.actions.setLaundryItems(res)];
                    } else {
                        return [laundrySlice.actions.setLaundryItems([])];
                    }
                }),
                catchError((e: AjaxError) => {
                    console.log(e.request);
                    return [];
                }),
            );
        }),
    );
const createLaundryService$: RootEpic = (action$, state$) =>
    action$.pipe(
        filter(createLaundryService.match),
        switchMap(re => {
            return HotelServiceApi.createDryCleaningService(re.payload).pipe(
                mergeMap((res: any) => {
                    if (res && !res?.response?.error) {
                        return [
                            laundrySlice.actions.setLaundryItems(
                                state$.value.laundry.items,
                            ),
                        ];
                    } else {
                        return [laundrySlice.actions.setIsSubmitting(false)];
                    }
                }),
                catchError((e: AjaxError) => {
                    console.log(e.request);
                    console.log(e.response);
                    return [laundrySlice.actions.setIsSubmitting(false)];
                }),
            );
        }),
    );
export const LaundryEpics = [fetchLaundry$, createLaundryService$];
export const laundryReducer = laundrySlice.reducer;
