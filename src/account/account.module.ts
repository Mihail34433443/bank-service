import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { Client } from 'src/client/clients.model';
import { Transaction } from 'src/transaction/transaction.model';
import { TransactionService } from 'src/transaction/transaction.service';
import { AccountController } from './account.controller';
import { Account } from './account.model';
import { AccountService } from './account.service';

@Module({
  controllers: [AccountController],
  providers: [
    AccountService,
    TransactionService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  imports: [
    SequelizeModule.forFeature([Account, Client, Transaction]),
    ThrottlerModule.forRoot({
      ttl: 15,
      limit: 3,
    }),
  ],
})
export class AccountModule {}
