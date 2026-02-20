import {
  IPrismaCountArgs,
  IPrismaFindManyArgs,
  IPrismaModelDelegate,
  IQueryConfig,
  IQueryParams,
} from "../interface/querybuilder.interface";

export class QueryBuillder<T, TWhereInput = Record<string, unknown>> {
  private query: IPrismaFindManyArgs;
  private countQuery: IPrismaCountArgs;
  private page: number = 1;
  private limit: number = 10;
  private skip: number = 0;
  private sortBy: string = "createdAt";
  private sortOrder: "asc" | "desc" = "desc";
  private selectFields: Record<string, boolean>;

  constructor(
    private model: IPrismaModelDelegate,
    private queryParams: IQueryParams,
    private config: IQueryConfig,
  ) {
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: 10,
    };
    this.countQuery = {
      where: {},
    };
  }
}
