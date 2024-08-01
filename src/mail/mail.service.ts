import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import * as path from 'path';
import { Repository } from 'typeorm';
import { Verification } from './entity/verification.entity';
import { User } from 'src/auth/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {}

  generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendMail(receiver: string, code: string) {
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
          code: code,
        },
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async saveVerificationCode(email: string, code: string) {
    console.log(email, code);
    const verification = this.verificationRepository.create({
      email,
      code,
    });
    await this.verificationRepository.save(verification);
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const verification = await this.verificationRepository.findOne({
      where: { code, email },
    });
    console.log(verification);

    if (verification && verification.email === email) {
      return true;
    }
    return false;
  }
}
