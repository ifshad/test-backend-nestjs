import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const whitelist = ['http://localhost:3001'];
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser requests (Postman, curl)
      if (whitelist.includes(origin)) return callback(null, true);
      callback(new Error('CORS policy: Origin not allowed'));
    },
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log('Server running on Port:', port);
}
bootstrap();
