import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/datebase/database.service';

@Injectable()
export class PaymentMethodRepository {
  constructor(private readonly database: DatabaseService) {}

  findAllPaymentMethod() {
    return this.database.paymentMethod.findMany();
  }
}
