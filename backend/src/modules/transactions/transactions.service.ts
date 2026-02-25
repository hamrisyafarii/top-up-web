import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from './transaction.repository';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ProductsRepository } from '../products/products.repository';
import { ApiResponse } from 'src/common/interfaces/response.interfce';
import { generateTransactionCode } from 'src/utils/generate-transaction-code';
import { XenditService } from '../payments/xendit.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepo: TransactionsRepository,
    private readonly productRepo: ProductsRepository,
    private readonly xenditService: XenditService,
  ) {}

  async createTransaction(dto: CreateTransactionDto, userId: string): Promise<ApiResponse> {
    const product = await this.productRepo.findProductById(dto.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const transactionCode = generateTransactionCode();

    const transaction = await this.transactionRepo.create({
      transactionCode,
      playerId: dto.playerId,
      zoneId: dto.zoneId,
      price: product.price,
      productAmount: product.amount,
      productBonus: product.bonus,

      user: { connect: { id: userId } },
      game: { connect: { id: product.gameId } },
      product: { connect: { id: product.id } },
      paymentMethod: { connect: { id: dto.paymentMethodId } },
    });

    const invoice = await this.xenditService.createInvoice(
      String(transaction.transactionCode),
      Number(transaction.price),
    );

    const updatedTransaction = await this.transactionRepo.update(transaction.id, {
      externalId: invoice.externalId,
      invoiceUrl: invoice.invoiceUrl,
    });

    return {
      statusCode: 200,
      message: `Success create Transaction with invocie ${transaction.transactionCode}`,
      data: {
        transaction: updatedTransaction,
      },
    };
  }

  async getTransactionByCode(code: string): Promise<ApiResponse> {
    const transaction = await this.transactionRepo.findTransactionByCode(code);

    if (!transaction) {
      throw new NotFoundException('Transaction Not Found !');
    }

    return {
      statusCode: 200,
      message: `Successfully get transaction with code: ${code}`,
      data: transaction,
    };
  }

  async getAllTransaction(userId: string): Promise<ApiResponse> {
    const transactions = await this.transactionRepo.findAllTransactionByUser(userId);

    return {
      statusCode: 200,
      message: 'Successfully get all transactions',
      data: transactions,
    };
  }
}
