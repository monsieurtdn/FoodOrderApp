import { AnyAction } from '@reduxjs/toolkit';
import { Epic } from 'redux-observable';
import { RootState } from '../store/reducers';

export type RootEpic = Epic<AnyAction, AnyAction, RootState>;
export interface SystemConfig {
    hostIdentity: string;
}
export interface UserData {
    userOrgId: string;
    organizationRoles: string[];
    id: string;
    invitationStatus: string;
    userName: string;
    email: string;
    phoneNumber: string | null;
    firstname: string;
    lastname: string;
    gender: string | null;
    avatarUrl: string | null;
    profile: any;
    forcePasswordChange: boolean;
}

export interface LoginInfo {
    username: string;
    password: string;
    remember: boolean;
}
export interface ForgotType {
    email: string;
}
export interface UserResponse {
    amr: string[];
    aud: string;
    auth_time: number;
    client_id: string;
    exp: number;
    iat: number;
    idp: string;
    iss: string;
    nbf: number;
    profile: string;
    role: string;
    scope: string[];
    sub: string;
    orgRoles: string;
}

export interface ResponseToken {
    error: string;
    jwt: string;
    user: UserData;
}

export interface Token_ResponseToken {
    access_token: string;
    refresh_token: string;
    token_type: string;
    scope: number;
}
export interface LoginInfo {
    username: string;
    password: string;
    remember: boolean;
    captchaId?: string;
    captcha?: string;
}

export interface IOrganization {
    orgid: string;
    orgdesc: string;
    orgidParent: string | null;
    orgord: number | null;
    isccsl: number | null;
    orgcode: string;
    active: number;
    orlevel: number;
    listChild: any;
}

export interface ReqInfo {
    maGn: string;
    thang: number;
    nam: number;
    userid: string;
}

export interface OrgReq {
    orgId?: string | null;
    thang?: number | null;
    nam?: number | null;
    rid?: number | null;
}

export interface ErrorResponse {
    message?: string;
    status?: string;
    data?: any;
}

interface IDetailDataValue {
    label?: string | null;
    value?: string | null | number;
}

export interface ITitleAndDetailData {
    title?: string | null;
    data?: IDetailDataValue[] | null;
}

export interface ItemData {
    id?: number | null | string;
    name: string | null;
    detail?: ITitleAndDetailData[] | null;
}
export interface DataSource {
    id?: number | null | string;
    name?: string | null;
    children?: ItemData[] | null;
    detail?: ITitleAndDetailData[] | null;
}
export interface Profile {
    Id: string;
    UserName: string;
    Firstname: string;
    Lastname: string;
    Email: string;
    PhoneNumber: string;
    InvitationStatus: string;
    ForcePasswordChange: boolean;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export enum InputType {
    TEXT = 'text',
    SELECT = 'select',
    NUMBER = 'number',
    CHECKBOX = 'checkbox',
    PASSWORD = 'password',
    DATE = 'date',
}
export interface IProfile {
    id: number;
    tingId: string;
    mask: number;
    dateOfBirth: string;
    departmentId: number;
    startDate: string;
    endDate: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    homeTown: string;
    identity: string;
    maritalStatus: string;
    nationality: string;
    picture: string;
}

export interface IMinibarItem {
    id: number;
    ma: string;
    ten: string;
    donViTinh: string;
    donGia: number;
    guid: string;
    accountCode: string;
    hotelGUID: string;
    ghiChu?: string;
}
export interface IOrderedMinibarItem extends IMinibarItem {
    quantity: number;
}
export interface ILaundryItem {
    id: number;
    ma: string;
    ten: string;
    laundry: number;
    dry: number;
    pressingOnly: number;
    laundryVND: number;
    laundryUSD: number;
    dryCleaningVND: number;
    dryCleaningUSD: number;
    pressingOnlyVND: number;
    pressingOnlyUSD: number;
    ghiChu: string;
    status: number;
}
export interface IOrderedLaundryItem extends ILaundryItem {
    quantity: number;
    type: LaundryType;
    donGia: number;
}
export enum LaundryType {
    LAUNDRY = 'laundry',
    DRY = 'dry',
    PRESSING = 'pressing',
}
export enum IdentifyType {
    CCCD = 'cccd',
    Passport = 'pp',
    QR = 'qr',
}
export interface IUpdateGuestIdentity {
    mvarRoomNo: string;
    mvarGuestName: string;
    mvarFistName: string;
    mvarPassport: string;
    mvarBirthDay: string;
    mvarPassportDate: string;
    mvarGioiTinh: string;
}
export interface IScanInfor {
    que_quan?: string;
    full_name?: string;
    thuong_tru?: string;
    no_cccd?: string;
    birth_Date: string;
    exp_Date: string;
    sex: string;
    path?: string;
    first_Name?: string;
    last_Name?: string;
    middle_Name?: string | null;
    national?: string;
    state?: string;
    passport?: string;
}

export interface IProduct {
    name: string;
    data: {
        itemImg: any;
        price: number;
        nutrition: number;
        orderImg: any;
        Nhomhang: number;
    };
}
export interface IOrderComponent extends IProduct {
    count: number;
    notes: string;
    cookNow: boolean;
}
export interface IOrders {
    components: IOrderComponent[];
    name: string;
    date: string;
    status: 'Confirmed' | 'Unconfirmed' | 'Cancelled';
}
export interface INation {
    id: number;
    ten: string;
    ma: string;
}
export enum ScanResultStatus {
    SUCCESS = 'success',
    LOADING = 'loading',
    ERROR = 'error',
}
export interface IFloor {
    floor: number;
    roomNumber: number;
    oc: number;
    od: number;
    vd: number;
    vc: number;
    vci: number;
}
export interface ITotal {
    room: number;
    oc: number;
    od: number;
    vd: number;
    vc: number;
    vci: number;
}
export interface IRoom {
    roomID: number;
    roomGuid: string;
    roomNo: number;
    floorNo: number;
    roomTypeCode: string;
    roomTypeName: string;
    roomStatusCode: RoomStatusCode;
    tsRoomID: number;
    tsRoomGuid: string;
    rate: number;
    firstName: string | null;
    lastName: string | null;
    hsu: boolean;
    comp: boolean;
    noPost: boolean;
    tsRoomCommnet: string | null;
    vci: number;
    guestID: number;
    arrivalDate: string;
    departureDate: string;
}
export enum RoomStatusCode {
    /// <summary>
    /// Occlude Clean
    /// </summary>
    OC = 'OC',
    /// <summary>
    /// Occlude Dirty
    /// </summary>
    OD = 'OD',
    /// <summary>
    /// Vacant Clean
    /// </summary>
    VC = 'VC',
    /// <summary>
    /// Vacant Dirty
    /// </summary>
    VD = 'VD',
}
export interface IDetail_ICreateMinibarService {
    hangHoa: number;
    soLuong: number;
    donGia: number;
    thanhTien: number;
    status?: number;
}
export interface ICreateMinibarService {
    ngayThang: string;
    thanhTien: number;
    tyLeGiamTru?: number;
    soTienGiamTru?: number;
    tongSoTien: number;
    ghiChu?: string;
    nguoiDung?: number;
    capDo?: number;
    tgtn?: string;
    guest?: number;
    freeCharge: boolean;
    status?: number;
    servicesCharge?: number;
    vatCharge?: number;
    nightAuditorRun?: number;
    soPhong: string;
    chiTietGiaoDichMiniBars: IDetail_ICreateMinibarService[];
}
export interface IDetail_ICreateLaundryService {
    hangHoa: number;
    soLuong: number;
    donGia: number;
    thanhTien: number;
    status?: number;
    flagType: number;
}
export interface ICreateLaundryService {
    ngayThang: string;
    thanhTien: number;
    tyLeGiamTru?: number;
    soTienGiamTru?: number;
    tongSoTien: number;
    ghiChu?: string;
    nguoiDung?: number;
    capDo?: number;
    tgtn?: string;
    guest?: number;
    freeCharge: boolean;
    status?: number;
    servicesCharge?: number;
    vatCharge?: number;
    nightAuditorRun?: number;
    tongVND: number;
    soPhong: string;
    chiTietGiaoDichLaundry: IDetail_ICreateLaundryService[];
}
export interface IUpdateRoom {
    status: CleanedStatus;
    inspected: InspectedStatus;
    id: number;
}
export interface IUpdateRoomByFloor {
    status: CleanedStatus;
    id: number;
}
export enum CleanedStatus {
    CLEANED = 0,
    DIRTY = 1,
}
export enum InspectedStatus {
    TRUE = 1,
    FALSE = 0,
}
