import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from './modules/games/games.module';
import { DatabaseModule } from './infrastructure/datebase/database.module';
import { ProductsModule } from './modules/products/products.module';
import { PaymentMethodModule } from './modules/payment_method/payment_method.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GamesModule,
    DatabaseModule,
    ProductsModule,
    PaymentMethodModule,
    AuthModule,
    TransactionsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
