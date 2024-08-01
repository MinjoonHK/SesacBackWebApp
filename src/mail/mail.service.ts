import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(receiver: string) {
    try {
      await this.mailerService.sendMail({
        to: receiver,
        subject: '당찬 이메일 인증번호',
        template: './mailTemplate',
        headers: {
          'X-Entity-Ref-ID': '0',
          'X-Attachment-Id': 'dangchan',
          'Content-ID': '<dangchan>',
        },
        attachments: [
          {
            filename: 'dangchan.png',
            path: path.join(__dirname, './template/dangchan.png'),
            cid: 'dangchan',
          },
        ],
        context: {
          code: '1234',
        },
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
