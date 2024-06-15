import HttpClient from 'api/http-client';
import SYSTEM_CONSTANTS from 'common/constants';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

export default class OrderServiceApi {
    static host = SYSTEM_CONSTANTS.ORDER.HOST;
    static getTablesMap(id: number): Observable<any> {
        const api = 'http://192.168.1.8/restaurant/api/get_tables.php?page=1';
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
    static getProductList(id: number): Observable<any> {
        const api = `http://192.168.1.8/restaurant/api/get_dishes.php?page=${id}`;
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
    static getProductImg(id: number): Observable<any> {
        const api = `http://192.168.1.8/restaurant/api/get_image.php?dishID=${id}`;
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
    static createOrder(order: any): Observable<any> {
        const api = 'http://localhost/restaurant/api/create_order.php';
        return HttpClient.post(api, order, {
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
    static updateOrder(order: any): Observable<any> {
        const api = 'http://localhost/restaurant/api/update_order.php';
        return HttpClient.post(api, order, {
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
    static getExcel(id: number): Observable<any> {
        const api = `http://localhost/restaurant/api/generate_bill.php?orderID=${id}`;
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
}
