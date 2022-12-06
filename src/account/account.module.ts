import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from 'src/client/clients.model';
import { Transaction } from 'src/transaction/transaction.model';
import { TransactionService } from 'src/transaction/transaction.service';
import { AccountController } from './account.controller';
import { Account } from './account.model';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService, TransactionService],
  imports: [SequelizeModule.forFeature([Account, Client, Transaction])],
})
export class AccountModule {}
