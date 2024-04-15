export enum CategoryDisplay {
    card = 'card',
    news = 'news',
    list = 'list',
    tree = 'tree',
    profileCard = 'profileCard',
    productCard = 'productCard',
    infoCard = 'infoCard',
    blogCard = 'blogCard',
    contentCard = 'contentCard',
    mediaCard = 'mediaCard',
    anatomyCard = 'anatomyCard',
    collectionsCard = 'collectionsCard',
    linkList = 'linkList',
}

export enum MenuCategory {
    home = 'home',
    introductions = 'introductions',
    products = 'products',
    service = 'services',
    news = 'news',
    contact = 'contact',
    infoPages = 'infoPages',
    simpleLink = 'simpleLink',
}

export enum WigetComponent {
    contact = 'contact',
    news = 'news',
}

export enum WigetPosition {
    top = 'top',
    bottom = 'bottom',
    left = 'left',
    right = 'right',
    center = 'center',
}

export interface Media {
    url: string;
}

export enum AndroidPermissionEnum {
    camera = 'camera',
    galary = 'galary',
    both = 'both',
}

export enum RoleEnum {
    member = 'Member',
    admin = 'Admin',
    superUser = 'Superuser',
}

// user epic interface
export interface IJob {
    id: number;
    employeeId: number;
    categoryId: number;
    startDate: Date;
    endDate: Date;
    location: string;
    salary: number;
    specification: string;
    status: number;
    supervisorId: number;
    titleId: number;
}

export interface IContactDetail {
    employeeId: number;
    mask: number;
    addressStreet1: string;
    addressStreet2: string;
    city: string;
    country: string;
    homePhone: string;
    mobile: string;
    otherEmail: string;
    workEmail: string;
    workPhone: string;
    zipCode: string;
}

export interface IUserInfo {
    id: string;
    tingId: string;
    dateOfBirth: string;
    departmentId: string;
    startDate: Date;
    endDate: Date;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    homeTown: string;
    identity: string;
    maritalStatus: string;
    nationality: string;
    picture: string;
    status: number;
    mood: string;
    contactDetail: IContactDetail;
    companies: number[];
    jobs: IJob[];
}
