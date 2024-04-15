import HttpClient from 'api/http-client';
import SYSTEM_CONSTANTS from 'common/constants';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

export default class OrderServiceApi {
    static host = SYSTEM_CONSTANTS.ORDER.HOST;
    static getTablesMap(id: number): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.ORDER.TOUCHTOORDER}/GetTableMap?RestaurantID=${id}`;
        return HttpClient.post(api, {
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
    static getProductList(id: number): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.ORDER.TOUCHTOORDER}/GetGoodServices?RestaurantID=${id}`;
        return HttpClient.post(api, {
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
    static getProductCategory(id: number): Observable<any> {
        const api = `${this.host}/${SYSTEM_CONSTANTS.ORDER.TOUCHTOORDER}/GetCategoryOfGoodServices?RestaurantID=${id}`;
        return HttpClient.post(api, {
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
}
