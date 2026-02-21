import { Body, Controller, Headers, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

type BodyType = {
  external_id: string;
  status: 'PAID' | 'PENDING' | 'EXPIRED' | 'FAILED';
};

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Post('callback')
  async handleCallback(@Body() body: BodyType, @Headers('x-callback-token') callbackToken: string) {
    return this.paymentService.handleXenditCallback(body, callbackToken);
  }
}
