import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { User } from 'src/modules/auth/domain/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (!apiKey) {
      throw new Error('SENDGRID_API_KEY is not defined');
    }
    sgMail.setApiKey(apiKey);
  }

  async sendOrderConfirmation(user: User, order: any) {
    const fromEmail = this.configService.get<string>('SENDGRID_FROM_EMAIL');
    if (!fromEmail) {
      throw new Error('SENDGRID_FROM_EMAIL is not defined');
    }

    const msg = {
      to: user.email,
      from: fromEmail,
      subject: 'Confirmación de pedido',
      text: `Gracias por tu pedido #${order.id}`,
      html: `
        <h1>Gracias por tu pedido, ${user?.name ?? 'Juan Perez'}!</h1>
        <p>Aquí está el resumen de tu pedido #${order.id}:</p>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.quantity}x ${item.burger?.name} - $${item.price}</li>`,
            )
            .join('')}
        </ul>
        <p><strong>Total:</strong> $${order.total}</p>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error.response?.body || error);
      throw error;
    }
  }
}
