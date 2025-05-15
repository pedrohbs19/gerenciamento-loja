import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .setTitle('Gerenciamento de Loja')
    .setDescription('documentação do gerenciamento de lojas backend')
    .setVersion('1.0')
    .addTag('Gerenciamento de loja')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  const PORT = process.env.PORT ?? 3000;

  await app.listen(PORT, '0.0.0.0');

  console.log(`[🤖]: Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((e) => {
  console.log(e);
});
