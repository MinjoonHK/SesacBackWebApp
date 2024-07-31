import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './UserDto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): string {
    return 'All users';
  }

  @Get(':id')
  findUser(@Param('id') id: string): string {
    return 'User';
  }

  @Post()
  create(@Body() UserDto: UserDto) {
    return 'User created';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UserDto: UserDto) {
    return 'User updated';
  }
}
