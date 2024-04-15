const SYSTEM_CONSTANTS = {
    // HOST: 'https://license.hicas.vn',
    IDENTITY: {
        HOST: 'https://api.tingconnect.com',
        LOGIN: 'api/Account/login',
        PROFILE: 'api/Account/getuserinfo',
        FORGOT: (email: string) =>
            `license_manager/users/${email}/notify/passwordreset`,
        CAPTCHA: 'identity/clients/captcha',
        CHANGEPASS: 'api/Account/changepass',
    },
    CAMERA: {
        HOST: 'https://ai.hicas.vn',
        REGISTER_PERSON: 'api/Person/create',
        DETECT_FACE: 'api/Person/detectfaceImage',
        DETECT_FACE_RESULT: 'api/Person/detectfaceImageResult',
        REGISTER: 'api/attendance/register',
        ATTENDANCE: 'api/attendance/attendance',
    },
    HRM: {
        HOST: 'https://api.tingconnect.com',
        GET_USER_INFO: 'api/Employee/me',
        UPDATE_USER_INFO: (id: number) => `api/Employee/${id}`,
    },
    ADMIN: {
        HOST: 'https://api.tingconnect.com',
        GET_LIST_OPERATOR_CENTER_BY_DEPARTMENT_ID: (departmentId: number) =>
            `api/OperationCenter/me/${departmentId}`,
    },
    EMPLOYEE: {
        HOST: 'https://recognition.tingconnect.com',
        GET_ALL_EMPLOYEE: 'api/Attendance/employees',
    },
    ATTENDANCE: {
        HOST: 'https://recognition.tingconnect.com',
        GET_ALL_EMPLOYEES_OF_OPERATOR: 'api/Attendance/employees/all',
        SAVE_MEALS_INFORMATION: 'api/Attendance/meals',
        SAVE_CHECK_IN: 'api/Attendance',
        UNREGISTER_FACE: (employeeId: string) =>
            `api/Attendance/employee/${employeeId}/unregister`,
    },
    SHIFT: {
        HOST: 'https://recognition.tingconnect.com',
        GET_ALL_SHIFTS: 'api/Shifts',
    },
    OPERATOR: {
        HOST: 'https://recognition.tingconnect.com',
        GET_EMPLOYEES_BY_OPERATOR_ID: (operatorId: number) =>
            `api/Operators/${operatorId}/employees`,
    },
    NOTE: {
        HOST: 'https://recognition.tingconnect.com',
        GET_ALL_NOTES: 'api/Notes',
        CREATE_NOTE: 'api/Notes',
        UPDATE_NOTE: (id: string) => `api/Notes/${id}`,
    },
    HOTEL: {
        HOST: 'https://uat.pkm.hicas.vn',
        NIGHT_AUDIT: 'NightAuditor',
        SERVICE: 'Service',
    },
    SCAN: {
        HOST: 'https://uat.pkm.hicas.vn',
        IDENTIFY: 'Identify',
    },
    ORDER: {
        HOST: 'http://115.73.219.178:8086',
        TOUCHTOORDER: 'api/TouchtoOrder',
    },
};

export default SYSTEM_CONSTANTS;

export const ERROR_MSG = {
    REQUIRED: 'Thông tin không được bỏ trống',
    EMAIL: 'Email không hợp lệ',
    NUMBER: 'Chỉ được phép nhập số',
    COMMON: 'Thông tin không hợp lệ',
};
