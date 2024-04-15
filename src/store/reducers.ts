import { combineReducers } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';
import { PersonEpics, PersonReducer } from './controls/Camera.slice';
import { homeReducer } from './controls/HomeEpic';
import { LoginEpics, loginReducer } from './controls/LoginEpic';
import { BootstrapEpics, bootstrapReducer } from './controls/bootstrap.slice';
import { persistReducer } from './controls/PersistToSave';
import { UserEpics, userReducer } from './controls/UserEpic';
import { EmployeeEpics, employeeReducer } from './controls/EmployeeEpic';
import { AdminEpics, adminReducer } from './controls/AdminEpic';
import { MinibarEpics, minibarReducer } from './slice/MnibarSlice';
import { LaundryEpics, laundryReducer } from './slice/LaundrySlice';
import { AttendanceEpics, attendanceReducer } from './controls/AttendanceEpic';
import { ShiftEpics, shiftReducer } from './controls/ShiftsEpic';
import { OperatorEpics, operatorReducer } from './controls/OperatorsEpic';
import { NoteEpics, noteReducer } from './controls/NoteEpic';
import { ScanEpics, scanReducer } from './slice/ScanSlice';
import { HotelEpics, hotelReducer } from './slice/HotelSlice';
import { DashBoardEpics, DashboardReducer } from './slice/DashboardSlice';
import { OrderReducer } from './slice/OrderSlice';

const rootReducer = combineReducers({
    login: loginReducer,
    bootstrap: bootstrapReducer,
    person: PersonReducer,
    home: homeReducer,
    persist: persistReducer,
    user: userReducer,
    employee: employeeReducer,
    admin: adminReducer,
    minibar: minibarReducer,
    laundry: laundryReducer,
    attendance: attendanceReducer,
    shift: shiftReducer,
    operator: operatorReducer,
    note: noteReducer,
    scan: scanReducer,
    hotel: hotelReducer,
    dashboard: DashboardReducer,
    order: OrderReducer,
});

export const rootEpic = combineEpics(
    ...LoginEpics,
    ...BootstrapEpics,
    ...PersonEpics,
    ...UserEpics,
    ...EmployeeEpics,
    ...AdminEpics,
    ...AttendanceEpics,
    ...ShiftEpics,
    ...OperatorEpics,
    ...NoteEpics,
    ...MinibarEpics,
    ...LaundryEpics,
    ...ScanEpics,
    ...HotelEpics,
    ...DashBoardEpics,
);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
