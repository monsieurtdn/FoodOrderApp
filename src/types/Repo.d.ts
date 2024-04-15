export enum RepoErrorType {
  RESPONSE_ERROR = 1,
  USER_NOT_FOUND = 2,
  USERNAME_EMPTY = 3,
  USER_HAS_NO_REPO = 4,
  GITHUB_RATE_LIMIT = 5,
}

export interface DataRepo<T> {
  data: {
    id: number;
    attributes: T;
  }[];
  meta?: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

export interface DataItemRepo<T> {
  data: {
    id: number;
    attributes: T;
  };
}

export interface DataItem<T> {
  id: number;
  attributes: T;
}
