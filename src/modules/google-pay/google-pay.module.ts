import { Module } from '@nestjs/common';
import { GooglePayController } from './google-pay.controller';
import { GooglePayService } from './google-pay.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTransaction } from './entities/payment-transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentTransaction])],
  controllers: [GooglePayController],
  providers: [GooglePayService]
})
export class GooglePayModule { }
