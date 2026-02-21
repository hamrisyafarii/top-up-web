import { Module } from '@nestjs/common';
import { TransactionsController } from './transaction.controller';
import { TransactionsRepository } from './transaction.repository';
import { TransactionsService } from './transactions.service';
import { ProductsModule } from '../products/products.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsRepository, TransactionsService],
  imports: [ProductsModule, PaymentsModule],
})
export class TransactionsModule {}
