import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestLimitGuard } from 'src/guards/request-limit.guard';
import { Transaction } from 'src/transaction/transaction.model';
import { OPERATION_TYPE } from './account.enum';
import { Account } from './account.model';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';

@ApiTags('Accounts')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({ summary: 'Создание аккаунта' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Account })
  @Post(':id')
  create(
    @Body() clientDto: CreateAccountDto,
    @Param('id') idClient: string,
  ): Promise<Account> {
    return this.accountService.createAccount(clientDto, idClient);
  }

  @ApiOperation({ summary: 'Пополнение счёта' })
  @ApiResponse({ status: HttpStatus.OK, type: Account })
  @Patch('/replenishment/:id/:count')
  accountReplenishment(
    @Param('id') idAccount: string,
    @Param('count') count: string,
  ): Promise<Transaction> {
    return this.accountService.changeBalance(
      idAccount,
      count,
      OPERATION_TYPE.PLUS,
    );
  }

  @UseGuards(RequestLimitGuard)
  @ApiOperation({ summary: 'Получение текущего баланса' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  @Get('/balance/:id')
  getAccountBalance(@Param('id') idAccount: string): Promise<string> {
    return this.accountService.getAccountBalanceById(idAccount);
  }

  @ApiOperation({ summary: 'Снятие со счёта' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  @Patch('/withdrawal/:id/:count')
  accountWithdrawal(
    @Param('id') idAccount: string,
    @Param('count') count: string,
  ): Promise<Transaction> {
    return this.accountService.changeBalance(
      idAccount,
      count,
      OPERATION_TYPE.MINUS,
    );
  }

  @ApiOperation({ summary: 'Блокировка аккаунта' })
  @ApiResponse({ status: HttpStatus.OK, type: String })
  @Patch('/block/:id')
  block(@Param('id') idAccount: string): Promise<string> {
    return this.accountService.blockAccount(idAccount);
  }
}
