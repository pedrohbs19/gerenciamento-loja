import { ApiProperty } from '@nestjs/swagger';

export class ProdutoVendaDto {
  @ApiProperty({ example: 1 })
  produtoId: number;

  @ApiProperty({ example: 5 })
  quantidade: number;
}

export class CriaVendaDto {
  @ApiProperty()
  idCliente: number;

  @ApiProperty({ type: ProdutoVendaDto, isArray: true })
  produtos: ProdutoVendaDto[];
}
