import { Body, Controller, Post, Res } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post('send')
  async sendEmail(@Res() res, @Body() emailData: { to: string }) {
    const { to } = emailData;
    const code = this.mailService.generateVerificationCode();
    const emailSent = await this.mailService.sendMail(to, code);
    if (emailSent) {
      await this.mailService.saveVerificationCode(to, code);
      res.status(200).send({ message: '성공적으로 이메일을 보냈습니다' });
    } else {
      res.status(500).send({ message: '이메일 전송에 실패하였습니다' });
    }
  }

  @Public()
  @Post('authcheck')
  async authCheck(@Body() authCheckDto: { email: string; code: string }) {
    const isVerified = await this.mailService.verifyCode(
      authCheckDto.email,
      authCheckDto.code,
    );
    return { verified: isVerified };
  }
}
