import Utils from 'common/Utils';
import {
    ICreateLaundryService,
    ICreateMinibarService,
    IUpdateRoom,
    IUpdateRoomByFloor,
} from 'common/define-types';
import { Observable, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import SYSTEM_CONSTANTS from '../../common/constants';
import HttpClient from '../http-client';
export default class HotelServiceApi {
    static host = SYSTEM_CONSTANTS.HOTEL.HOST;

    static getMinibarItems(): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.HOTEL.SERVICE}/miniBar`;
        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }

    static getDryCleaningItems(): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.HOTEL.SERVICE}/dry`;
        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }

    static createMinibarService(body: ICreateMinibarService): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.HOTEL.SERVICE}/miniBar`;
        return HttpClient.post(api, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }

    static createDryCleaningService(
        body: ICreateLaundryService,
    ): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.HOTEL.SERVICE}/Laundry`;
        return HttpClient.post(api, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }

    static getFloors(nowDate: string): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.HOTEL.SERVICE}/floor/sumary?nowDate=${nowDate}`;
        console.log(nowDate);
        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }

    static getAllFloors(nowDate: string): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.HOTEL.SERVICE}/floor/sumary/total?nowDate=${nowDate}`;
        console.log(nowDate);
        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }

    static getRooms(nowDate: string): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.HOTEL.SERVICE}/room?nowDate=${nowDate}`;
        console.log(nowDate);

        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }
    static updateRoomByNo(body: IUpdateRoom): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.HOTEL.SERVICE}/roomNo/${
            body.id
        }?${Utils.getParamsString({
            status: body.status,
            inspected: body.inspected,
        })}`;
        return HttpClient.put(
            api,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        ).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }
    static updateRoomById(body: IUpdateRoom): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.HOTEL.SERVICE}/roomId/${
            body.id
        }?${Utils.getParamsString({
            status: body.status,
            inspected: body.inspected,
        })}`;
        return HttpClient.put(
            api,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        ).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }
    static updateRoomsStatusByFloorNo(
        body: IUpdateRoomByFloor,
    ): Observable<any> {
        const api = `${this.host}/${
            SYSTEM_CONSTANTS.HOTEL.SERVICE
        }/room/floor/${body.id}?${Utils.getParamsString({
            status: body.status,
        })}`;
        return HttpClient.put(
            api,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        ).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }
}
