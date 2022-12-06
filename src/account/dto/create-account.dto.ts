import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({ example: '1234' })
  readonly balance: string;
  @ApiProperty({ example: '12' })
  readonly dailyWithdrawalLimit: string;
  @ApiProperty({ example: 'true' })
  readonly active: boolean;
  @ApiProperty({ example: '1' })
  readonly accountType: number;
}
