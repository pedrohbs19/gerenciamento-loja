import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { CriaVendaDto } from './dto/cria-venda.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { ListaVendasDto } from './dto/lista-vendass.dto';
import { produtosVendaDto } from './dto/produtos-venda.dto';

@Injectable()
export class VendasService {
  constructor(private readonly prisma: PrismaService) {}

  async criarvenda(data: CriaVendaDto): Promise<{ Message: string }> {
    const findCliente = await this.prisma.clientes.findUnique({
      where: { idCliente: data.idCliente },
    });
    if (!findCliente)
      throw new BadRequestException({ Message: 'Cliente não existe!' });

    const produtos: { produtoId: number; quantidade: number }[] = [];
    let total = new Decimal(0);
    for await (const produto of data.produtos) {
      const findProdutos = await this.prisma.produtos.findUnique({
        where: { idProduto: produto.produtoId, active: true },
      });

      if (!findProdutos)
        throw new BadRequestException({
          Message: `Produto não encontrado: ${produto.produtoId}`,
        });

      const qtdPreco = new Decimal(produto.quantidade).mul(findProdutos.preco);
      total = total.add(qtdPreco.toFixed(2));
      produtos.push({
        produtoId: produto.produtoId,
        quantidade: produto.quantidade,
      });
    }

    const venda = await this.prisma.vendas.create({
      data: {
        clienteId: data.idCliente,
        total: total,
        status: 'EM PROCESSO',
        produtos: { create: produtos },
      },
    });

    return { Message: `Venda registrada com ID ${venda.idVenda}` };
  }

  async listaVendas(): Promise<ListaVendasDto[]> {
    const findVendas = await this.prisma.vendas.findMany({
      where: { active: true },
      select: {
        idVenda: true,
        cliente: {
          select: {
            name: true,
          },
        },
        total: true,
        status: true,
      },
    });
    if (!findVendas)
      throw new BadRequestException({
        Message: 'N]ao existem vendas cadastradas!',
      });

    return findVendas;
  }

  async listaProdutosVenda(id: number): Promise<produtosVendaDto[]> {
    console.log(id);

    const findProdutosVenda = await this.prisma.vendaProduto.findMany({
      where: { vendaId: Number(id) },
      select: {
        produto: {
          select: { name: true },
        },
        quantidade: true,
      },
    });

    if (!findProdutosVenda)
      throw new BadRequestException({
        Message: 'Produtos pertencentes a essa venda não encontrados.',
      });

    return findProdutosVenda;
  }
}
