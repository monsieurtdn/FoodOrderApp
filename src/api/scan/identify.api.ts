import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import SYSTEM_CONSTANTS from '../../common/constants';
import HttpClient from '../http-client';
import { AjaxError } from 'rxjs/ajax';
import { IUpdateGuestIdentity, IdentifyType } from 'common/define-types';
export default class IdentifyApi {
    static host = `${SYSTEM_CONSTANTS.SCAN.HOST}/${SYSTEM_CONSTANTS.SCAN.IDENTIFY}`;

    static getNational(): Observable<any> {
        const api = `${this.host}/nation`;
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
    static updateGuestIdentity(body: IUpdateGuestIdentity): Observable<any> {
        const api = `${this.host}/guest`;
        return HttpClient.put(api, body, {
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
    static createIdentityCheck(
        type: IdentifyType,
        Photo: FormData,
    ): Observable<any> {
        const api = `${this.host}/check?type=${type}`;
        return HttpClient.post(api, Photo, {
            headers: {
                'content-type': 'multipart/form-data',
            }}).pipe(map(res => (res as any) || null,
        catchError((e: AjaxError) => throwError(console.log(e)))));
    }
}
