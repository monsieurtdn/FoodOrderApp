import { ResponseToken } from 'common/define-types';
import { Observable, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import {
    ISaveCheckInPayload,
    ISearchEmployeeProps,
} from 'store/controls/AttendanceEpic';
import SYSTEM_CONSTANTS from '../../common/constants';
import HttpClient from '../http-client';
export default class AttendanceApi {
    static host = SYSTEM_CONSTANTS.ATTENDANCE.HOST;

    static getAllEmployees(body: ISearchEmployeeProps): Observable<any> {
        let api = `${AttendanceApi.host}/${SYSTEM_CONSTANTS.ATTENDANCE.GET_ALL_EMPLOYEES_OF_OPERATOR}?OperatorId=${body.OperatorId}&Date=${body.Date}`;
        if (body.Name) {
            api += `&Name=${body.Name}`;
        }
        return HttpClient.get(api, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).pipe(map(res => res));
    }

    static saveMealInformation(body: any[]): Observable<any> {
        let api = `${AttendanceApi.host}/${SYSTEM_CONSTANTS.ATTENDANCE.SAVE_MEALS_INFORMATION}`;

        return HttpClient.post(api, body, {
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

    static saveCheckIn(body: ISaveCheckInPayload[]): Observable<any> {
        let api = `${AttendanceApi.host}/${SYSTEM_CONSTANTS.ATTENDANCE.SAVE_CHECK_IN}`;

        return HttpClient.post(api, body, {
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

    static unregister(id: string): Observable<any> {
        let api = `${
            AttendanceApi.host
        }/${SYSTEM_CONSTANTS.ATTENDANCE.UNREGISTER_FACE(id)}`;

        return HttpClient.post(api, {
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

    // static getIssueByID(id: string): Observable<any> {
    //     const api = `${IssueApi.host}/${SYSTEM_CONSTANTS.ISSUE.GET_ISSUE_BY_ID(
    //         id,
    //     )}`;
    //     return HttpClient.get(api, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).pipe(map(res => res));
    // }

    // static createIssue(body: {
    //     leaderId: string;
    //     supplierId: string;
    //     ticketId: string;
    //     groupId: string;
    //     type: number;
    //     isComfirmByAdmin: boolean;
    //     pathFile: string;
    //     amount_money: string;
    //     motobikeNumber: string;
    //     driverId: string;
    //     reason: string;
    //     note: string;
    //     createdTime: Date;
    //     modifiedTime: Date;
    //     roomTemplateId: string;
    // }): Observable<ResponseToken | null> {
    //     const api = `${IssueApi.host}/${SYSTEM_CONSTANTS.ISSUE.CREATE_NEW_ISSUE}`;

    //     return HttpClient.post(api, body, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).pipe(
    //         map(
    //             res => (res as ResponseToken) || null,
    //             catchError((e: AjaxError) => {
    //                 console.log(e);
    //                 return throwError(e);
    //             }),
    //         ),
    //     );
    // }

    // static updateIssue(
    //     body: {
    //         leaderId: string;
    //         supplierId: string;
    //         ticketId: string;
    //         groupId: string;
    //         type: string;
    //         amount: string;
    //         status: string;
    //     },
    //     id: string,
    // ): Observable<ResponseToken | null> {
    //     const api = `${IssueApi.host}/${SYSTEM_CONSTANTS.TICKET.UPDATE_TICKET(
    //         id,
    //     )}`;
    //     var request = new URLSearchParams();
    //     request.append('leaderId', body.leaderId);
    //     request.append('supplierId', body.supplierId);
    //     request.append('ticketId', body.ticketId);
    //     request.append('groupId', body.groupId);
    //     request.append('type', body.type);
    //     request.append('amount', body.amount);
    //     request.append('status', body.status);

    //     return HttpClient.put(api, request.toString(), {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).pipe(
    //         map(
    //             res => (res as ResponseToken) || null,
    //             catchError((e: AjaxError) => {
    //                 console.log(e);
    //                 return throwError(e);
    //             }),
    //         ),
    //     );
    // }

    // static deleteIssueByID(id: string): Observable<any> {
    //     const api = `${
    //         IssueApi.host
    //     }/${SYSTEM_CONSTANTS.ISSUE.DELETE_ISSUE_BY_ID(id)}`;
    //     return HttpClient.delete(api, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).pipe(map(res => res));
    // }

    // static uploadImage(body: FormData): Observable<ResponseToken | null> {
    //     const api = `${IssueApi.host}/${SYSTEM_CONSTANTS.ISSUE.UPLOAD_IMAGE}`;

    //     return HttpClient.post(api, body, {
    //         headers: {
    //             accept: '*/*',
    //             'content-type': 'multipart/form-data',
    //         },
    //     }).pipe(
    //         map(res => {
    //             console.log('imga upload res: ', res);
    //             return res as ResponseToken;
    //         }),
    //         catchError((e: AjaxError) => {
    //             console.log(e);
    //             return throwError(e);
    //         }),
    //     );
    // }

    // static approveIssues(body: string[]): Observable<ResponseToken | null> {
    //     const api = `${IssueApi.host}/${SYSTEM_CONSTANTS.ISSUE.APRROVE_ISSUES}`;

    //     return HttpClient.put(api, body, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).pipe(
    //         map(
    //             res => (res as ResponseToken) || null,
    //             catchError((e: AjaxError) => {
    //                 console.log(e);
    //                 return throwError(e);
    //             }),
    //         ),
    //     );
    // }

    // static rejectIssues(body: string[]): Observable<ResponseToken | null> {
    //     const api = `${IssueApi.host}/${SYSTEM_CONSTANTS.ISSUE.REJECT_ISSUES}`;

    //     return HttpClient.put(api, body, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     }).pipe(
    //         map(
    //             res => (res as ResponseToken) || null,
    //             catchError((e: AjaxError) => {
    //                 console.log(e);
    //                 return throwError(e);
    //             }),
    //         ),
    //     );
    // }
}
