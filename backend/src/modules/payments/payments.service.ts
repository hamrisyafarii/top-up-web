import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/datebase/database.service';
import { StatusTransaction } from 'src/generated/prisma/enums';

type Body = {
  external_id: string;
  status: 'PAID' | 'PENDING' | 'EXPIRED' | 'FAILED';
};

@Injectable()
export class PaymentsService {
  constructor(private database: DatabaseService) {}

  async handleXenditCallback(body: Body, callbackToken: string) {
    // Verify callback token
    if (callbackToken !== process.env.XENDIT_WEBHOOK_TOKEN) {
      throw new UnauthorizedException('Invalid callback token');
    }

    const { external_id, status } = body;

    if (!external_id) {
      throw new BadRequestException('Invalid payload');
    }

    //  Cari transaction berdasarkan externalId
    const transaction = await this.database.transaction.findUnique({
      where: { externalId: external_id },
    });

    if (!transaction) {
      throw new BadRequestException('Transaction not found');
    }

    //  Idempotency check
    if (transaction.status === 'PAID') {
      return { message: 'Already completed' };
    }

    //  Mapping status Xendit
    let newStatus: StatusTransaction;

    switch (status) {
      case 'PAID':
        newStatus = StatusTransaction.PAID;
        break;

      case 'PENDING':
        newStatus = StatusTransaction.PENDING;
        break;

      case 'FAILED':
      case 'EXPIRED':
        newStatus = StatusTransaction.FAILED;
        break;

      default:
        newStatus = StatusTransaction.PENDING;
    }

    //  Update status
    await this.database.transaction.update({
      where: { id: transaction.id },
      data: { status: newStatus },
    });

    return { message: 'Callback processed' };
  }
}
