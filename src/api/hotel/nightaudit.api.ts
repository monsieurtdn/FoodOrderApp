import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import SYSTEM_CONSTANTS from '../../common/constants';
import HttpClient from '../http-client';
import { AjaxError } from 'rxjs/ajax';
export default class HotelNightAuditApi {
    static host = SYSTEM_CONSTANTS.HOTEL.HOST;

    static getBusinessDate(): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.HOTEL.NIGHT_AUDIT}`;
        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(map(res => (res as any) || null,
        catchError((e: AjaxError) => throwError(e))));
    }
}
