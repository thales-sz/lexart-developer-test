import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationHelper<T> {
  async execute(
    items: T[],
    currentPage: number,
    itemsPerPage: number,
    total: number,
  ): Promise<{
    items: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const totalItems = total;

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return { items, currentPage, totalPages, totalItems };
  }
}
