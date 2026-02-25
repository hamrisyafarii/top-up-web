import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import type { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTransDto: CreateTransactionDto, @Req() req: RequestWithUser) {
    return this.transactionService.createTransaction(createTransDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':code')
  getTransactionWithCode(@Param('code') code: string) {
    return this.transactionService.getTransactionByCode(code);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTransaction(@Req() req: RequestWithUser) {
    return this.transactionService.getAllTransaction(req.user.id);
  }
}
