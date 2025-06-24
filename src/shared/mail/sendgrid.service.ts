import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { User } from 'src/modules/auth/domain/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    sgMail.setApiKey(this.configService.get<string>('SENDGRID_API_KEY') ?? '');
  }

  async sendOrderConfirmation(user: User, order: any) {
    const msg = {
      to: user.email,
      from: this.configService.get<string>('SENDGRID_FROM_EMAIL') ?? '',
      subject: 'Confirmación de pedido',
      text: `Gracias por tu pedido #${order.id}`,
      html: `
        <h1>Gracias por tu pedido, ${user.name}!</h1>
        <p>Aquí está el resumen de tu pedido #${order.id}:</p>
        <!-- Más detalles del pedido -->
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
