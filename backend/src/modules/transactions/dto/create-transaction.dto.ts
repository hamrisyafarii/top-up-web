import { IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  playerId: string;

  @IsString()
  zoneId: string;

  @IsUUID()
  productId: string;

  @IsUUID()
  paymentMethodId: string;
}
