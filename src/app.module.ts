import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GooglePayModule } from './google-pay/google-pay.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaymentTransaction } from './google-pay/entities/payment-transaction.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any),
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '1433'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [PaymentTransaction],
      synchronize: false,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    GooglePayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
