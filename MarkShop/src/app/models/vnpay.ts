export interface VnPayPayment {
    success: boolean;
    paymentMethod: string;
    orderDescription: string;
    orderId: string;
    paymentId: string;
    transactionId: string;
    token: string;
    vnPayResponseCode: string;
}

export interface PaymentInformation {
    orderId: number;
    name: string;
    amount: number;
    orderDescription: string;
    orderType: string;
    url: string;
}