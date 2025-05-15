import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { CriaVendaDto } from './dto/cria-venda.dto';
import { ListaVendasDto } from './dto/lista-vendass.dto';
import { produtosVendaDto } from './dto/produtos-venda.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async criaVenda(@Body() data: CriaVendaDto): Promise<{ Message: string }> {
    return await this.vendasService.criarvenda(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async ListaVendas(): Promise<ListaVendasDto[]> {
    return await this.vendasService.listaVendas();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('produtosVenda/:id')
  async ProdutossVenda(@Param('id') id: number): Promise<produtosVendaDto[]> {
    return await this.vendasService.listaProdutosVenda(id);
  }
}
