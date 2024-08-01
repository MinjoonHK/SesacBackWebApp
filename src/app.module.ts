import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { User } from './auth/entity/user.entity';
import { Verification } from './mail/entity/verification.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_URL,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Verification],
      synchronize: true, // Entity 만들시 테이블 자동생성 개발 모듈에서만 사용
      ssl: {
        ca: process.env.DB_SSL,
      },
    }),
    UsersModule,
    MailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
