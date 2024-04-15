import { Contact } from '../store/types/contact.type';
import { request } from '../utils/request';
import { URLs } from './constant';

export const apiPostRegister = () => {
    return request(`${URLs.postContact}`);
};

export const apiCreateContact = (contact: Contact) => {
    return request(`${URLs.postContact}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
};
