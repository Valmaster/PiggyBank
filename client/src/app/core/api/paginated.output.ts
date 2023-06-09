export interface PaginatedOutput<T> {
  readonly total: number;
  readonly items: Array<T>;
  readonly hasMore: boolean;
}
