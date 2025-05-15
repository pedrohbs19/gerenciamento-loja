import { Decimal } from '@prisma/client/runtime/library';

export interface produtosDto {
  idProduto: number;
  codigo: string;
  name: string;
  description?: string;
  preco: Decimal;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
