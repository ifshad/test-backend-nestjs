import { Body, Controller, Post } from '@nestjs/common';
import { GooglePayService } from './google-pay.service';

@Controller('google-pay')
export class GooglePayController {
    constructor(private readonly paymentService: GooglePayService) { }

    @Post('make-payment')
    async handleGooglePay(@Body() body: any) {
        const { orderId, amount, paymentToken } = body;
        return this.paymentService.handleGooglePayPayment(orderId, amount, paymentToken);
    }

}
