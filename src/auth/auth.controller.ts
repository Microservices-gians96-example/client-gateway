import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Get('/')
  getUsers() {
    return 'getUser'
  }

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.login.user', loginUserDto);

  }

  @Post('verify-token')
  verifyToken() {
    return this.client.send('auth.verify.token.user', {});

  }
}
