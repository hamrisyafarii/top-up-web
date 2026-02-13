import { Injectable } from '@nestjs/common';
import { PaymentMethodRepository } from './payment_method.repository';
import { ApiResponse } from 'src/common/interfaces/response.interfce';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly PaymentMethodRepo: PaymentMethodRepository) {}

  async findAllPaymentMethod(): Promise<ApiResponse> {
    const paymentMethods = await this.PaymentMethodRepo.findAllPaymentMethod();

    return {
      statusCode: 200,
      message: 'Successfully get all data payment methods',
      data: paymentMethods,
    };
  }
}
