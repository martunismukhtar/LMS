declare module 'midtrans-client' {
  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface BankTransfer {
    bank: string;
    va_number?: string;
  }

  interface ChargeParams {
    payment_type: string;
    transaction_details: TransactionDetails;
    bank_transfer?: BankTransfer;
    [key: string]: string; // Untuk fleksibilitas jika ada parameter tambahan
  }

  interface ChargeResponse {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_status: string;
    fraud_status: string;
    [key: string]: string; // Untuk fleksibilitas
  }

  export class Snap {
    constructor(config: { isProduction: boolean; serverKey: string; clientKey?: string });
    createTransaction(params: {
      transaction_details: TransactionDetails;
      customer_details?: {
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
      };
      [key: string]: string; // Untuk fleksibilitas
    }): Promise<{ token: string; redirect_url: string }>;
  }

  export class CoreApi {
    constructor(config: { isProduction: boolean; serverKey: string; clientKey?: string });
    charge(params: ChargeParams): Promise<ChargeResponse>;
    transaction: {
      status(orderId: string): Promise<ChargeResponse>;
      cancel(orderId: string): Promise<ChargeResponse>;
      refund(orderId: string, params: { amount?: number; reason?: string }): Promise<ChargeResponse>;
    };
  }
}
