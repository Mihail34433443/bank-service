import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from './transaction.model';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction) private transactionRepositry: typeof Transaction,
  ) {}

  async getAllTransactions(accountId: string): Promise<Transaction[]> {
    const transactions = await this.transactionRepositry.findAll({
      where: { accountId: accountId },
    });
    return transactions;
  }

  async createTransaction(
    accountId: string,
    value: number,
  ): Promise<Transaction> {
    const transactions = await this.transactionRepositry.create({
      accountId: accountId,
      value: Number(value),
      transactionDate: Date(),
    });
    return transactions;
  }
}
