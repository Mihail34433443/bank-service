import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'name' })
  readonly name: string;
  @ApiProperty({ example: 'document' })
  readonly document: string;
  @ApiProperty({ example: 'birth date' })
  readonly birthDate: string;
}
