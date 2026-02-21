import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { XenditService } from './xendit.service';

@Module({
  providers: [PaymentsService, XenditService],
  controllers: [PaymentsController],
  exports: [XenditService],
})
export class PaymentsModule {}
