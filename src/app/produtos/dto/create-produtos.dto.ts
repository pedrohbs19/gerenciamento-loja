import { ApiProperty } from '@nestjs/swagger';

export class createProdutosDto {
  @ApiProperty()
  codigo: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  preco: number;
}
