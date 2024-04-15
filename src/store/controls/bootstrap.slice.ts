import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootEpic, SystemConfig } from '../../common/define-types';
import { filter, map, switchMap, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import IdentityApi from '../../api/identity/identity.api';
import { OperatorFunction } from 'rxjs';

interface BootstrapState {
    systemConfig: SystemConfig;
    isSuccess: boolean;
}
const PATH_SYSTEM_CONFIG = '';
const IS_CONFIG_LOCAL = false;
const DEFAULT_CONFIG: SystemConfig = {
    hostIdentity: 'https://api.tingconnect.com',
};
const initialStateBootstrap: BootstrapState = {
    systemConfig: DEFAULT_CONFIG,
    isSuccess: false,
};

function updateHostService(host: SystemConfig) {
    IdentityApi.host = host.hostIdentity;
}
const bootstrapSlice = createSlice({
    name: 'bootstrap',
    initialState: initialStateBootstrap,
    reducers: {
        setSystemConfig: (state, action: PayloadAction<SystemConfig>) => {
            updateHostService(action.payload);
            state.systemConfig = action.payload;
            state.isSuccess = true;
        },
        fetchConfig: state => {
            state.isSuccess = false;
        },
    },
});

const bootstrap$: RootEpic = (action$: {
    pipe: (
        arg0: OperatorFunction<
            Action<unknown>,
            { payload: undefined; type: 'bootstrap/fetchConfig' }
        >,
        arg1: OperatorFunction<
            unknown,
            { payload: SystemConfig; type: 'bootstrap/setSystemConfig' }
        >,
        arg2: OperatorFunction<unknown, unknown>,
    ) => any;
}) =>
    action$.pipe(
        filter(fetchConfig.match),
        switchMap(() => {
            return ajax
                .getJSON(PATH_SYSTEM_CONFIG, {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                })
                .pipe(
                    map(res => {
                        const config =
                            !IS_CONFIG_LOCAL && res
                                ? (res as SystemConfig)
                                : DEFAULT_CONFIG;
                        return bootstrapSlice.actions.setSystemConfig(config);
                    }),
                );
        }),
        catchError(() => [
            bootstrapSlice.actions.setSystemConfig(DEFAULT_CONFIG),
        ]),
    );

export const BootstrapEpics = [bootstrap$];

export const { fetchConfig } = bootstrapSlice.actions;
export const bootstrapReducer = bootstrapSlice.reducer;
