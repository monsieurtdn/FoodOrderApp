import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProduct } from 'common/define-types';
import { format } from 'date-fns';
import { IOrderComponent, IOrders } from './../../common/define-types';
const getCurrentDateTime = () => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'EEEE, MMMM d, yyyy | HH:mm');
    return formattedDate;
};
export interface OrderState {
    isBottomSheetOpen: boolean;
    isBottomSheetResOpen: boolean;
    orderComponents: IOrderComponent[];
    listProduct: IProduct[];
    restaurantProducts: IProduct[];
    chosenProduct: IProduct;
    orders: IOrders[];
    indexNumber: number;
    cloneComponents: IOrderComponent[];
    confirmedComponents: IOrderComponent[];
}
export const initialState: OrderState = {
    isBottomSheetOpen: false,
    isBottomSheetResOpen: false,
    orderComponents: [],
    listProduct: [],
    restaurantProducts: [],
    chosenProduct: {
        name: '',
        data: {
            itemImg: undefined,
            price: 0,
            nutrition: 0,
            orderImg: undefined,
        },
    },
    orders: [],
    indexNumber: 0,
    cloneComponents: [],
    confirmedComponents: [],
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setSheetOpeneded: (state, action: PayloadAction<boolean>) => {
            state.isBottomSheetOpen = action.payload;
        },
        setResSheetOpeneded: (state, action: PayloadAction<boolean>) => {
            state.isBottomSheetResOpen = action.payload;
        },
        chooseProduct: (state, action: PayloadAction<IProduct>) => {
            state.chosenProduct.name = action.payload.name;
            state.chosenProduct.data = action.payload.data;
        },
        resetListProduct: state => {
            state.listProduct = [];
        },
        addListProduct: (state, action: PayloadAction<IProduct>) => {
            state.listProduct.push(action.payload);
        },
        addRestaurantProducts: (state, action: PayloadAction<IProduct>) => {
            state.restaurantProducts.push(action.payload);
        },
        refreshRestaurantProducts: state => {
            state.restaurantProducts = [];
        },
        addOrderComponent: (state, action: PayloadAction<IOrderComponent>) => {
            state.orderComponents.push(action.payload);
            const currentTimeFormatted = getCurrentDateTime();
            if (state.orderComponents.length === 1) {
                state.orders.push({
                    components: state.orderComponents,
                    name: `Order ${state.orders.length + 1}`,
                    date: currentTimeFormatted,
                    status: 'Unconfirmed',
                });
                state.confirmedComponents = state.orders.flatMap(order => {
                    return order.components.map(component => {
                        return {
                            ...component,
                            status: order.status,
                        };
                    });
                });
            } else {
                state.orders[state.orders.length - 1].components =
                    state.orderComponents;
                state.confirmedComponents = state.orders.flatMap(order => {
                    return order.components.map(component => {
                        return {
                            ...component,
                            status: order.status,
                        };
                    });
                });
            }
        },
        deleteOrderComponent: (state, action: PayloadAction<number>) => {
            state.orderComponents.splice(action.payload, 1);
            state.orders[state.orders.length - 1].components =
                state.orderComponents;
        },
        // switchingOrderComponent: (state, action: PayloadAction<number>) => {

        // },
        confirmOrder: state => {
            state.orders[state.orders.length - 1].components =
                state.orderComponents;
            state.orders[state.orders.length - 1].status = 'Confirmed';
            state.orderComponents = [];
            state.confirmedComponents = state.orders.flatMap(order => {
                return order.components.map(component => {
                    return {
                        ...component,
                        status: order.status,
                    };
                });
            });
        },
        deleteOrder: (state, action: PayloadAction<number>) => {
            if (action.payload === state.orders.length - 1) {
                state.orders[state.orders.length - 1].status = 'Confirmed';
            }
            state.orders[state.orders.length - 1].status = 'Confirmed';
        },
        setIndexNumber: (state, action: PayloadAction<number>) => {
            state.indexNumber = action.payload;
        },
        cancelOrder: (state, action: PayloadAction<number>) => {
            state.orders[action.payload].status = 'Cancelled';
        },
        callCloneComponent: (state, action: PayloadAction<number>) => {
            state.cloneComponents = [];
            state.cloneComponents = state.orders[action.payload].components;
        },
        updateListComponent: (
            state,
            action: PayloadAction<IOrderComponent[]>,
        ) => {
            state.orderComponents = action.payload;
        },
        confirmUpdate: (state, action: PayloadAction<number>) => {
            state.orders[action.payload].components = state.cloneComponents;
        },
        clearConfirmedOrder: state => {
            state.orderComponents = [];
            state.confirmedComponents = [];
        },
        updateCountComponent: (
            state,
            action: PayloadAction<{ count: number; index: number }>,
        ) => {
            console.log('count');
            const index = action.payload.index;

            if (state.orderComponents[index]) {
                state.orderComponents[index].count = action.payload.count;
                console.log(state.orderComponents[index]);
            } else {
                console.log(`Item at index ${index} is undefined.`);
            }
        },
        swapItemComponents: (
            state,
            action: PayloadAction<{ index1: number; index2: number }>,
        ) => {
            const newArray = [...state.orderComponents];
            if (
                action.payload.index1 >= 0 &&
                action.payload.index1 < newArray.length &&
                action.payload.index2 >= 0 &&
                action.payload.index2 < newArray.length
            ) {
                [
                    newArray[action.payload.index1],
                    newArray[action.payload.index2],
                ] = [
                    newArray[action.payload.index2],
                    newArray[action.payload.index1],
                ];
            }
            state.orderComponents = newArray;
            console.log('state:', state.orderComponents);
        },
        updateNoteComponent: (
            state,
            action: PayloadAction<{ notes: string; index: number }>,
        ) => {
            console.log('note');
            const index = action.payload.index;

            if (state.orderComponents[index]) {
                state.orderComponents[index].notes = action.payload.notes;
                console.log(state.orderComponents[index]);
            } else {
                console.log(`Item at index ${index} is undefined.`);
            }
        },
        updateCookNowComponent: (
            state,
            action: PayloadAction<{ cookNow: boolean; index: number }>,
        ) => {
            console.log('cookNow');
            const index = action.payload.index;

            if (state.orderComponents[index]) {
                state.orderComponents[index].cookNow = action.payload.cookNow;
                console.log(state.orderComponents[index]);
            } else {
                console.log(`Item at index ${index} is undefined.`);
            }
        },
        updateCountConfirmed: (
            state,
            action: PayloadAction<{ count: number; index: number }>,
        ) => {
            console.log('count');
            const index = action.payload.index;

            if (state.orderComponents[index]) {
                state.orderComponents[index].count = action.payload.count;
                console.log(state.orderComponents[index]);
            } else {
                console.log(`Item at index ${index} is undefined.`);
            }
        },
        swapItemConfirmed: (
            state,
            action: PayloadAction<{ index1: number; index2: number }>,
        ) => {
            const newArray = [...state.confirmedComponents];
            if (
                action.payload.index1 >= 0 &&
                action.payload.index1 < newArray.length &&
                action.payload.index2 >= 0 &&
                action.payload.index2 < newArray.length
            ) {
                [
                    newArray[action.payload.index1],
                    newArray[action.payload.index2],
                ] = [
                    newArray[action.payload.index2],
                    newArray[action.payload.index1],
                ];
            }
            state.confirmedComponents = newArray;
            console.log('state:', state.confirmedComponents);
        },
        updateNoteConfirmed: (
            state,
            action: PayloadAction<{ notes: string; index: number }>,
        ) => {
            console.log('note');
            const index = action.payload.index;

            if (state.confirmedComponents[index]) {
                state.confirmedComponents[index].notes = action.payload.notes;
                console.log(state.confirmedComponents[index]);
            } else {
                console.log(`Item at index ${index} is undefined.`);
            }
        },
        updateCookNowConfirmed: (
            state,
            action: PayloadAction<{ cookNow: boolean; index: number }>,
        ) => {
            console.log('cookNow');
            const index = action.payload.index;

            if (state.confirmedComponents[index]) {
                state.confirmedComponents[index].cookNow =
                    action.payload.cookNow;
                console.log(state.confirmedComponents[index]);
            } else {
                console.log(`Item at index ${index} is undefined.`);
            }
        },
    },
});
export const {
    setSheetOpeneded,
    setResSheetOpeneded,
    addOrderComponent,
    addListProduct,
    resetListProduct,
    addRestaurantProducts,
    refreshRestaurantProducts,
    chooseProduct,
    deleteOrderComponent,
    deleteOrder,
    confirmOrder,
    setIndexNumber,
    cancelOrder,
    updateListComponent,
    callCloneComponent,
    confirmUpdate,
    swapItemComponents,
    clearConfirmedOrder,
    updateCountComponent,
    updateNoteComponent,
    updateCookNowComponent,
} = orderSlice.actions;
export const OrderReducer = orderSlice.reducer;
