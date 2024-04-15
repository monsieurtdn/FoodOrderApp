import { DataRepo } from '../../types/Repo';

export interface ContactState {
  loading: boolean;
  Contact: DataRepo<Contact>;
}

export interface Contact {
  fullname: string;
  email: string;
  phone: string;
  content: string;
}
