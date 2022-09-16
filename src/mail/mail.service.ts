import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationCode(email: string, confirmationCode: number) {
    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@sgp.com>',
      subject: 'Here is your confirmation code of SGP system',
      template: './send-confirmation-code', // `.hbs` extension is appended automatically
      context: { confirmationCode },
    });
  }
}
