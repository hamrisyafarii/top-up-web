import { Prisma } from 'src/generated/prisma/client';

type BaseQuery = {
  search?: string;
  page?: string;
  limit?: string;
  sort?: string;
} & Record<string, unknown>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type QueryBuilderOptions<WhereInput, OrderByInput> = {
  query: BaseQuery;
  searchFields?: (keyof WhereInput)[];
  defaultSort?: string;
};

export function queryBuilder<
  WhereInput extends Prisma.GameWhereInput,
  OrderByInput extends Prisma.GameOrderByWithRelationInput,
>({
  query,
  searchFields = [],
  defaultSort = 'createdAt:desc',
}: QueryBuilderOptions<WhereInput, OrderByInput>) {
  const { search, page = '1', limit = '10', sort = defaultSort, ...rawFilters } = query;

  const take = Number(limit);
  const skip = (Number(page) - 1) * take;

  const where: WhereInput = {
    AND: [],
  } as unknown as WhereInput;

  const andConditions: Prisma.GameWhereInput[] = [];

  // ================= SEARCH =================
  if (search && searchFields.length) {
    andConditions.push({
      OR: searchFields.map((field) => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    } as Prisma.GameWhereInput);
  }

  // ================= FILTER =================
  Object.entries(rawFilters).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // RANGE
    if (key.endsWith('_gte') || key.endsWith('_lte')) {
      const field = key.replace(/_(gte|lte)/, '');
      const operator = key.endsWith('_gte') ? 'gte' : 'lte';

      andConditions.push({
        [field]: {
          [operator]: isNaN(Number(value)) ? value : Number(value),
        },
      } as Prisma.GameWhereInput);

      return;
    }

    // IN QUERY
    if (typeof value === 'string' && value.includes(',')) {
      andConditions.push({
        [key]: {
          in: value.split(','),
        },
      } as Prisma.GameWhereInput);
      return;
    }

    // BOOLEAN
    if (value === 'true' || value === 'false') {
      andConditions.push({
        [key]: value === 'true',
      } as Prisma.GameWhereInput);
      return;
    }

    // DEFAULT
    andConditions.push({
      [key]: value,
    } as Prisma.GameWhereInput);
  });

  where.AND = andConditions;

  // ================= SORT =================
  const orderBy: OrderByInput[] = sort.split(',').map((s) => {
    const [field, direction] = s.split(':') as [keyof OrderByInput, 'asc' | 'desc'];

    return {
      [field]: direction === 'asc' ? 'asc' : 'desc',
    } as unknown as OrderByInput;
  });

  return {
    where,
    orderBy,
    skip,
    take,
    page: Number(page),
    takeNumber: take,
  };
}
