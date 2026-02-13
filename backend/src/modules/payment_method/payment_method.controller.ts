import { Controller, Get } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get()
  getAllPaymentMethods() {
    return this.paymentMethodService.findAllPaymentMethod();
  }
}
