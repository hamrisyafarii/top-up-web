export type BaseQuery = {
  search?: string;
  page?: string;
  limit?: string;
  sort?: string;
} & Record<string, unknown>;
