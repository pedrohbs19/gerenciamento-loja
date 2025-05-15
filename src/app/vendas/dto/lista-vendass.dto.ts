import { Decimal } from '@prisma/client/runtime/library';

export interface ListaVendasDto {
  idVenda: number;
  total: Decimal;
  status: string;
}
