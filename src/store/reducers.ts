import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import { LoginEpics, loginReducer } from './controls/LoginEpic';
import { persistReducer } from './controls/PersistToSave';
import { OrderReducer } from './slice/OrderSlice';

const rootReducer = combineReducers({
    login: loginReducer,
    persist: persistReducer,
    order: OrderReducer,
});

export const rootEpic = combineEpics(...LoginEpics);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
