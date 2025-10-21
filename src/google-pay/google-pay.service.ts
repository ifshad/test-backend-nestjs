import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaymentTransaction } from './entities/payment-transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GooglePayService {
    constructor(
        @InjectRepository(PaymentTransaction)
        private readonly paymentRepo: Repository<PaymentTransaction>,
    ) { }

    async handleGooglePayPayment(orderId: string, amount: number, paymentToken: any) {
        // 1️⃣ Create a pending record
        const payment = this.paymentRepo.create({
            order_id: orderId,
            amount,
            status: 'PENDING',
            response_data: JSON.stringify(paymentToken),
        });
        await this.paymentRepo.save(payment);

        try {
            // 2️⃣ Decrypt + validate the token (or send to Stripe)
            const result = await this.processGooglePayToken(paymentToken);

            // 3️⃣ Update success record
            payment.status = 'SUCCESS';
            payment.transaction_id = result.transactionId || "";
            payment.response_data = JSON.stringify(result);
            await this.paymentRepo.save(payment);

            return { success: true, payment };
        } catch (error) {
            // 4️⃣ Update failure
            payment.status = 'FAILED';
            payment.response_data = JSON.stringify({ error: error.message });
            await this.paymentRepo.save(payment);

            return { success: false, message: 'Payment failed', error: error.message };
        }
    }

    private async processGooglePayToken(token: any) {
        // 🔐 Decrypt/verify token or call Stripe
        // Simulated example:
        return { transactionId: 'TXN_' + Date.now(), status: 'OK' };
    }
}
