export class PaginationParam<Filter> {
  chainId?: string;
  page?: number;
  limit?: number;
  sort?: string[]; // value:desc|asc
  fields?: string; //Fields to return (ex: title,author)
  populate?: string;
  filters?: Filter;
  locale?: string;
  userAddress?: string | `0x${string}`;
}

export class PaginationOption {
  withCount?: boolean;
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
}

export class PaginationResponse<D> {
  data?: BaseEntity<D>[];
  // meta?: MetaResponse;
  currentPage?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  totalPages?: number;
  totalRecords?: number;
}
export class PaginationMeta {
  page!: number;
  pageSize!: number;
  pageCount!: number;
  total!: number;
}
export class MetaResponse {
  pagination?: PaginationMeta;
}
export class DataResponse<D> {
  data?: BaseEntity<D>;
  meta?: MetaResponse;
}
export class BaseEntity<D> {
  id!: number;
  attributes!: D;
}

export type tPagination = {
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalPages: number;
  totalRecords: number;
};
