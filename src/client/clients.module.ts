import { Module } from '@nestjs/common';
import { ClientService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './clients.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from 'src/account/account.model';

@Module({
  providers: [ClientService],
  controllers: [ClientsController],
  imports: [SequelizeModule.forFeature([Client, Account])],
})
export class ClientModule {}
