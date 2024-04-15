import { Observable, throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';
import { catchError, map } from 'rxjs/operators';
import SYSTEM_CONSTANTS from '../common/constants';
import HttpClient from './http-client';
export interface PersonResponse {
    name: string;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    id: string;
}
export interface DetectPersonResponse {
    createdBy: Date;
    status: number;
    inputName: string;
    outputName: string;
    result: string;
    id: string;
}
export interface RegisterPersonResponse {
    name: string;
    faces: {
        faceId: string;
        imageId: string;
        imageKey: string;
    }[];
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    id: string;
}
export default class CameraAPI {
    static host = SYSTEM_CONSTANTS.CAMERA.HOST;
    static create(name: string, body: any): Observable<PersonResponse | null> {
        const api = `${CameraAPI.host}/${SYSTEM_CONSTANTS.CAMERA.REGISTER_PERSON}?Name=${name}`;

        return HttpClient.uploadImages(api, body).pipe(
            map(
                res => (res as PersonResponse) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }
    static detect(body: any): Observable<DetectPersonResponse> {
        const api = `${CameraAPI.host}/${SYSTEM_CONSTANTS.CAMERA.DETECT_FACE}`;

        return HttpClient.uploadImage(api, body).pipe(
            map(
                res => (res as DetectPersonResponse) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }
    static getResult(id: string): Observable<DetectPersonResponse> {
        const api = `${CameraAPI.host}/${SYSTEM_CONSTANTS.CAMERA.DETECT_FACE_RESULT}/${id}`;

        return HttpClient.get(api).pipe(
            map(
                res => (res as DetectPersonResponse) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }

    static register(
        name: string,
        body: any,
    ): Observable<RegisterPersonResponse> {
        const api = `${CameraAPI.host}/${SYSTEM_CONSTANTS.CAMERA.REGISTER}?Name=${name}`;

        return HttpClient.uploadImages(api, body).pipe(
            map(
                res => res as RegisterPersonResponse,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }
    static attendance(
        name: string,
        body: any,
    ): Observable<RegisterPersonResponse> {
        const api = `${CameraAPI.host}/${SYSTEM_CONSTANTS.CAMERA.ATTENDANCE}?Name=${name}`;

        return HttpClient.uploadImage(api, body).pipe(
            map(
                res => (res as RegisterPersonResponse) || null,
                catchError((e: AjaxError) => throwError(e)),
            ),
        );
    }
}
