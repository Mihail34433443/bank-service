import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/account/account.model';
import { TransactionController } from './transaction.controller';
import { Transaction } from './transaction.model';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [SequelizeModule.forFeature([Transaction, Account])],
})
export class TransactionModule {}
