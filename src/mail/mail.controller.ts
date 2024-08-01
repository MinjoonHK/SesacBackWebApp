import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  Res,
} from '@nestjs/common';
import { MailService } from './mail.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Post('send')
  async sendEmail(@Res() res, @Body() emailData: { to: string }) {
    const { to } = emailData;
    const emailSent = await this.mailService.sendMail(to);
    if (emailSent) {
      res.status(200).send({ message: '성공적으로 이메일을 보냈습니다' });
    } else {
      res.status(500).send({ message: '이메일 전송에 실패하였습니다' });
    }
  }
}
