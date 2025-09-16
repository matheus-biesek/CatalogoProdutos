import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot());

  // Configuração do CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Catálogo de Produtos API')
    .setDescription('API para gerenciamento de catálogo de produtos com suporte a MongoDB e MySQL')
    .setVersion('1.0')
    .addTag('products', 'Operações relacionadas a produtos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Catálogo de Produtos - API Docs',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Aplicação rodando em: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📚 Documentação Swagger: http://localhost:${process.env.PORT ?? 3000}/api/docs`);
}
bootstrap();
