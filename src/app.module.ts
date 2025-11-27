import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PaymentTransaction } from './modules/google-pay/entities/payment-transaction.entity';
import { GooglePayModule } from './modules/google-pay/google-pay.module';
import { PdfModule } from './modules/pdf/pdf.module';
import { AuthModule } from './modules/auth/auth.module';
import { Organization } from './modules/auth/entities/organizations.entity';
import { Policy } from './modules/auth/entities/policy.entity';
import { Role } from './modules/auth/entities/role.entity';
import { User } from './modules/auth/entities/users.entity';
import { UserRoleMap } from './modules/auth/entities/user-role-map.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '1433'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        PaymentTransaction,
        Organization,
        Policy,
        Role,
        User,
        UserRoleMap,
      ],
      synchronize: false,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),
    GooglePayModule,
    PdfModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
