export interface IPrismaFindManyArgs {
  where?: Record<string, undefined>;
  include?: Record<string, undefined>;
  search?: Record<string, undefined>;
  orderBy?: Record<string, undefined>;
  skip?: number;
  take?: number;
  cursor?: number;
  distinct?: string[] | string;
  [key: string]: unknown;
}
export interface IPrismaCountArgs {
  where?: Record<string, undefined>;
  include?: Record<string, undefined>;
  search?: Record<string, undefined>;
  orderBy?: Record<string, undefined>;
  skip?: number;
  take?: number;
  cursor?: number;
  distinct?: string[] | string;
  [key: string]: unknown;
}

export interface IPrismaModelDelegate {
  findMany(args?: any): Promise<any[]>;
  count(args?: any): Promise<Number>;
}
export interface IQueryParams {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  fields?: string;
  includes?: string;
  [key: string]: unknown;
}

export interface IQueryConfig {
  searchableFields?: string[];
  filterableFields?: string[];
}
