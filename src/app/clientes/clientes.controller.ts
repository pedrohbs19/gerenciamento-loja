import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { criaClienteDto } from './dto/create-clientes.dto';
import { listaClientesDto } from './dto/clientes.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async cadastraCliente(
    @Body() data: criaClienteDto,
  ): Promise<{ Message: string }> {
    return await this.clientesService.cadastraCliente(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async listarClientes(): Promise<{ clientes: listaClientesDto[] }> {
    return await this.clientesService.listarClientes();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':idCliente')
  async lerCliente(
    @Param('idCliente') idCliente: number,
  ): Promise<listaClientesDto> {
    return await this.clientesService.lerCliente(idCliente);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':idCliente')
  async atualizarCliente(
    @Param('idCliente') idCliente: number,
    @Body() data: criaClienteDto,
  ): Promise<{ Message: string }> {
    return await this.clientesService.atualizarCliente(idCliente, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':idCliente')
  async removerCliente(
    @Param('idCliente') idCliente: number,
  ): Promise<{ Message: string }> {
    return await this.clientesService.removerCliente(idCliente);
  }
}
