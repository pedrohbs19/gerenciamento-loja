import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './app/produtos/produtos.module';
import { PrismaModule } from 'nestjs-prisma';
import { ClientesModule } from './app/clientes/clientes.module';
import { VendasModule } from './app/vendas/vendas.module';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [
    ProdutosModule,
    PrismaModule.forRoot({ isGlobal: true }),
    ClientesModule,
    VendasModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
