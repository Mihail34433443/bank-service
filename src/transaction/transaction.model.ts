import { ApiProperty } from '@nestjs/swagger';
import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/account/account.model';

interface TransactionsCreationAttrs {
  accountId: string;
  value: number;
  transactionDate: string;
}

@Table({ tableName: 'transactions' })
export class Transaction extends Model<Transaction, TransactionsCreationAttrs> {
  @ApiProperty({ example: '7f965900-7487-11ed-8f9e-a7d4c5b81f2b' })
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  })
  id: string;

  @ApiProperty({ example: '7f965900-7487-11ed-8f9e-a7d4c5b81f2b' })
  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  accountId: string;

  @ApiProperty({ example: '1234' })
  @Column({
    type: DataType.FLOAT,
  })
  value: number;

  @ApiProperty({ example: '2022-02-02 00:00:00.000 +0300' })
  @Column({
    type: DataType.DATE,
  })
  transactionDate: string;

  @BelongsTo(() => Account)
  account: Account;
}
