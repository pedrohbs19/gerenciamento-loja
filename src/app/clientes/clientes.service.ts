import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { criaClienteDto } from './dto/create-clientes.dto';
import { listaClientesDto } from './dto/clientes.dto';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async cadastraCliente(data: criaClienteDto): Promise<{ Message: string }> {
    if (!data)
      throw new BadGatewayException({ Message: 'Insira os dados do cliente!' });

    const findCliente = await this.prisma.clientes.findFirst({
      where: {
        OR: [{ email: data.email }, { document: data.document }],
      },
    });

    if (findCliente)
      throw new BadGatewayException({ Message: 'Cliente já exisste!' });

    const { email } = await this.prisma.clientes.create({ data });

    return { Message: `Cliente cadastrado: ${email}` };
  }

  async listarClientes(): Promise<{ clientes: listaClientesDto[] }> {
    const clientes = await this.prisma.clientes.findMany({
      where: { active: true },
    });
    return { clientes };
  }

  async lerCliente(idCliente: number): Promise<listaClientesDto> {
    const cliente = await this.prisma.clientes.findUnique({
      where: { idCliente: Number(idCliente), active: true },
    });

    if (!cliente)
      throw new NotFoundException({ Message: 'Cliente não encontrado!' });

    return cliente;
  }

  async atualizarCliente(
    idCliente: number,
    data: Partial<criaClienteDto>,
  ): Promise<{ Message: string }> {
    const cliente = await this.prisma.clientes.findUnique({
      where: { idCliente: Number(idCliente), active: true },
    });

    if (!cliente)
      throw new NotFoundException({ Message: 'Cliente não encontrado!' });

    await this.prisma.clientes.update({
      where: { idCliente: Number(idCliente) },
      data,
    });

    return { Message: `Cliente ${idCliente} atualizado com sucesso.` };
  }

  async removerCliente(idCliente: number): Promise<{ Message: string }> {
    const cliente = await this.prisma.clientes.findUnique({
      where: { idCliente: Number(idCliente), active: true },
    });

    if (!cliente)
      throw new NotFoundException({ Message: 'Cliente não encontrado!' });

    await this.prisma.clientes.update({
      where: { idCliente: Number(idCliente) },
      data: {
        active: false,
      },
    });

    return { Message: `Cliente ${idCliente} removido com sucesso.` };
  }
}
