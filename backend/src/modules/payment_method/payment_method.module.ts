import { Module } from '@nestjs/common';
import { PaymentMethodRepository } from './payment_method.repository';
import { PaymentMethodService } from './payment_method.service';
import { PaymentMethodController } from './payment_method.controller';

@Module({
  providers: [PaymentMethodRepository, PaymentMethodService],
  controllers: [PaymentMethodController],
})
export class PaymentMethodModule {}
