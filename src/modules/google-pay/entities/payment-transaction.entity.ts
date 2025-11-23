// payment-transaction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('payment_transactions')
export class PaymentTransaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_id: string;

    @Column({ nullable: true })
    transaction_id: string;

    @Column({ default: 'google_pay' })
    payment_method: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ default: 'BDT' })
    currency: string;

    @Column({ default: 'PENDING' })
    status: 'PENDING' | 'SUCCESS' | 'FAILED';

    @Column({ type: 'nvarchar', nullable: true })
    response_data: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
