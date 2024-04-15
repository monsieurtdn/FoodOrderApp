import SYSTEM_CONSTANTS from '../../common/constants';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import HttpClient from '../http-client';
import { ResponseToken, UserData } from '../../common/define-types';
import { AjaxError } from 'rxjs/ajax';
import Utils from 'common/Utils';
export default class IdentityApi {
    static host = SYSTEM_CONSTANTS.IDENTITY.HOST;
    static login(body: {
        identifier: string;
        password: string;
        // CaptchaId?: string;
        // Captcha?: string;
    }): Observable<ResponseToken | null> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.LOGIN}`;
        // const api = 'https://api.tingconnect.com/api/Account/login';
        console.log(api, 'api login ở identity');
        // var request = new URLSearchParams();
        // request.append('client_id', 'Admin');
        // request.append('grant_type', 'password');
        // request.append('scope', 'offline_access API');
        // request.append('loginName', body.identifier);
        // request.append('password', body.password);
        // if (body.Captcha && body.CaptchaId) {
        //     request.append('Captcha', body.Captcha);
        //     request.append('CaptchaId', body.CaptchaId);
        // }
        // console.log(request, 'request login ở identity apii');
        const reqBody = {
            loginName: body.identifier,
            password: body.password,
        };
        console.log(reqBody, 'reqBody');
        return HttpClient.post(api, reqBody, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(
            map(
                res => (res as ResponseToken) || null,
                catchError((e: AjaxError) => {
                    console.log(e);
                    return throwError(e);
                }),
            ),
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static refresh(body: {
        identifier: string;
        password: string;
    }): Observable<ResponseToken | null> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.LOGIN}`;
        var request = new URLSearchParams();
        request.append('client_id', 'Admin');
        request.append('grant_type', 'refresh_token');
        request.append('refresh_token', Utils.refresh);

        return HttpClient.post(api, request.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).pipe(
            map(
                res => (res as ResponseToken) || null,
                catchError((e: AjaxError) => {
                    console.log(e);
                    return throwError(e);
                }),
            ),
        );
    }
    static getProfile(): Observable<any> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.PROFILE}`;
        console.log(api, 'api getProfile');
        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).pipe(map(res => res));
    }
    static updateProfile(body: UserData): Observable<any> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.PROFILE}`;
        return HttpClient.put(api, body, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).pipe(map(res => res));
    }
    static forgotPassword(email: string): Observable<any | null> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.FORGOT(
            email,
        )}`;
        return HttpClient.post(api, {}).pipe(
            map(
                res => (res as any) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }
    static getCaptcha(email: string): Observable<any> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.CAPTCHA}/${email}`;
        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        }).pipe(map(res => res));
    }
    static changePassword(body: {
        oldPassword: string;
        newPassword: string;
    }): Observable<any> {
        const api = `${IdentityApi.host}/${SYSTEM_CONSTANTS.IDENTITY.CHANGEPASS}`;
        return HttpClient.put(api, body, {
            headers: {
                'Content-Type': 'application/json;',
            },
        }).pipe(map(res => res));
    }
}
