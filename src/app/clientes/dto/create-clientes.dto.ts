import { ApiProperty } from '@nestjs/swagger';

export class criaClienteDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  dtNasc: Date;
}
