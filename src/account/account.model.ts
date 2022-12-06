import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Client } from 'src/client/clients.model';
import { Transaction } from 'src/transaction/transaction.model';

interface AccountsCreationAttrs {
  personId: string;
  balance: string;
  dailyWithdrawalLimit: string;
  active: boolean;
  accountType: number;
  createDate: string;
}

@Table({ tableName: 'accounts' })
export class Account extends Model<Account, AccountsCreationAttrs> {
  @ApiProperty({ example: '7f965900-7487-11ed-8f9e-a7d4c5b81f2b' })
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  })
  id: string;

  @ApiProperty({ example: '7f965900-7487-11ed-8f9e-a7d4c5b81f2b' })
  @ForeignKey(() => Client)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  personId: string;

  @ApiProperty({ example: '1234' })
  @Column({
    type: DataType.FLOAT,
  })
  balance: string;

  @ApiProperty({ example: '12' })
  @Column({
    type: DataType.FLOAT,
  })
  dailyWithdrawalLimit: string;

  @ApiProperty({ example: 'true' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  active: boolean;

  @ApiProperty({ example: '1' })
  @Column({
    type: DataType.INTEGER,
  })
  accountType: number;

  @ApiProperty({ example: '2022-02-02 00:00:00.000 +0300' })
  @Column({
    type: DataType.DATE,
  })
  createDate: string;

  @BelongsTo(() => Client)
  client: Client;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
