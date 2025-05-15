import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { createProdutosDto } from './dto/create-produtos.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async CreateProduto(
    @Body() data: createProdutosDto,
  ): Promise<{ Message: string }> {
    return await this.produtosService.CreateProduto(data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async ListarProdutos() {
    return await this.produtosService.ListarProdutos();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  async BuscarProdutoPorId(@Param('id', ParseIntPipe) id: number) {
    return await this.produtosService.BuscarProdutoPorId(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  async AtualizarProduto(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: createProdutosDto,
  ): Promise<{ Message: string }> {
    return await this.produtosService.AtualizarProduto(id, data);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async RemoverProduto(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ Message: string }> {
    return await this.produtosService.RemoverProduto(id);
  }
}
