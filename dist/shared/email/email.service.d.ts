export declare class EmailService {
    private readonly logger;
    private transporter;
    constructor();
    sendHtmlEmail(to: string, subject: string, html: string): Promise<any>;
    getOrderStatusTemplate(customerName: string, orderId: number, status: string, total: number): string;
    getNewProductTemplate(productName: string, price: number, imageUrl: string, description: string): string;
}
