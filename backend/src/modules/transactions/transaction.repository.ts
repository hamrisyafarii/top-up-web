import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/datebase/database.service';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly database: DatabaseService) {}

  async create(dto: Prisma.TransactionCreateInput) {
    return this.database.transaction.create({
      data: dto,
    });
  }

  async findTransactionByCode(transactionCode: string) {
    return await this.database.transaction.findUnique({
      where: {
        transactionCode,
      },
    });
  }

  async findAllTransactionByUser(userId: string) {
    return await this.database.transaction.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        game: true,
        paymentMethod: { select: { name: true } },
      },
    });
  }

  async update(transactionId: string, data: { externalId: string; invoiceUrl: string }) {
    return await this.database.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        externalId: data.externalId,
        invoiceUrl: data.invoiceUrl,
      },
    });
  }
}
