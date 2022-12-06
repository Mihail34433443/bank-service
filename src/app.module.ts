import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './account/account.model';
import { AccountModule } from './account/account.module';
import { Client } from './client/clients.model';
import { ClientModule } from './client/clients.module';
import { Transaction } from './transaction/transaction.model';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Transaction, Client, Account],
      autoLoadModels: true,
    }),
    TransactionModule,
    ClientModule,
    AccountModule,
  ],
})
export class AppModule {}
