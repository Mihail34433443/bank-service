import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'src/transaction/transaction.model';
import { TransactionService } from 'src/transaction/transaction.service';
import { OPERATION_TYPE } from './account.enum';
import { Account } from './account.model';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private accountRepositry: typeof Account,
    private readonly transactionService: TransactionService,
  ) {}

  async createAccount(
    dto: CreateAccountDto,
    idClient: string,
  ): Promise<Account> {
    const account = await this.accountRepositry.create({
      personId: idClient,
      createDate: Date(),
      ...dto,
    });
    return account;
  }

  async changeBalance(
    accountId: string,
    count: string,
    operationType: OPERATION_TYPE,
  ): Promise<Transaction> {
    const account = await this.accountRepositry.findOne({
      where: { id: accountId },
    });

    const currentBalance = Number(account.balance);
    let newBalance: number;
    if (operationType === OPERATION_TYPE.PLUS) {
      newBalance = currentBalance + Number(count);
    } else {
      newBalance = currentBalance - Number(count);
    }

    await this.accountRepositry.update(
      {
        balance: String(newBalance),
      },
      {
        where: { id: accountId },
      },
    );

    const transaction = await this.transactionService.createTransaction(
      accountId,
      newBalance,
    );

    return transaction;
  }

  async getAccountBalanceById(accountId: string): Promise<string> {
    const balance = await this.accountRepositry.findOne({
      where: { id: accountId },
    });
    return balance.balance;
  }

  async blockAccount(accountId: string): Promise<string> {
    await this.accountRepositry.update(
      {
        active: false,
      },
      {
        where: { id: accountId },
      },
    );
    return accountId;
  }
}
