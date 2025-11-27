import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests (Postman, curl)
      if (whitelist.includes(origin)) return callback(null, true);
      callback(new Error('CORS policy: Origin not allowed'));
    },
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Test example')
    .setDescription('The test API description')
    .setVersion('1.0')
    .addTag('Test')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log('Server running on Port:', port);
}
bootstrap();
