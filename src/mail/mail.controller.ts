import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(
    @Body() emailData: { to: string; subject: string; content: string },
  ) {
    const { to, subject } = emailData;
    const emailSent = await this.mailService.sendMail(to, subject);
    if (emailSent) {
      return { message: 'Email sent successfully' };
    } else {
      return { message: 'Failed to send email' };
    }
  }
}
