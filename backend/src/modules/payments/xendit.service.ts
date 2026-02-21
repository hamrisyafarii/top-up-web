import { Injectable } from '@nestjs/common';
import { Xendit } from 'xendit-node';

@Injectable()
export class XenditService {
  private xendit: Xendit;

  constructor() {
    this.xendit = new Xendit({
      secretKey: process.env.XENDIT_SECRET_KEY!,
    });
  }

  async createInvoice(externalId: string, amount: number) {
    return this.xendit.Invoice.createInvoice({
      data: {
        externalId,
        amount,
        description: 'Nggal Top up',
      },
    });
  }
}
