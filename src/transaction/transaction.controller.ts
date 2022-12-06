import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';

@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiOperation({ summary: 'История транзакций' })
  @ApiResponse({ status: HttpStatus.OK, type: [Transaction] })
  @Get(':id')
  getAll(@Param('id') idAccount: string): Promise<Transaction[]> {
    return this.transactionService.getAllTransactions(idAccount);
  }
}
