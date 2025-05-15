import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { createProdutosDto } from './dto/create-produtos.dto';
import { produtosDto } from './dto/produtos.dto';

@Injectable()
export class ProdutosService {
  constructor(private readonly prisma: PrismaService) {}

  async CreateProduto(data: createProdutosDto): Promise<{ Message: string }> {
    if (!data) return { Message: 'Informe os dados!' };

    const findProduto = await this.prisma.produtos.findFirst({
      where: { codigo: data.codigo },
    });

    if (findProduto)
      throw new BadRequestException({
        Message: 'Código do produto já cadastrado!',
      });

    const { codigo } = await this.prisma.produtos.create({ data });

    return { Message: `Produto Cadastrado. Código ${codigo}` };
  }

  async ListarProdutos(): Promise<produtosDto[]> {
    return this.prisma.produtos.findMany({ where: { active: true } });
  }

  async BuscarProdutoPorId(idProduto: number): Promise<produtosDto> {
    const produto = await this.prisma.produtos.findUnique({
      where: { idProduto, active: true },
    });

    if (!produto)
      throw new NotFoundException({ Message: 'Produto não encontrado!' });

    return produto;
  }

  async AtualizarProduto(
    idProduto: number,
    data: Partial<createProdutosDto>,
  ): Promise<{ Message: string }> {
    const produto = await this.prisma.produtos.findUnique({
      where: { idProduto, active: true },
    });

    if (!produto)
      throw new NotFoundException({ Message: 'Produto não encontrado!' });

    await this.prisma.produtos.update({
      where: { idProduto },
      data,
    });

    return { Message: `Produto ${produto.codigo} atualizado com sucesso.` };
  }

  async RemoverProduto(idProduto: number): Promise<{ Message: string }> {
    const produto = await this.prisma.produtos.findUnique({
      where: { idProduto, active: true },
    });

    if (!produto)
      throw new NotFoundException({ Message: 'Produto não encontrado!' });

    await this.prisma.produtos.update({
      where: { idProduto },
      data: { active: false },
    });

    return { Message: `Produto ${idProduto} removido com sucesso.` };
  }
}
