import { Body, Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { Token, User } from './decorators';
import { CurrentUser } from './interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) { }

  @Get('/')
  getUsers() {
    return 'getUser'
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await firstValueFrom(this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    ))
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await firstValueFrom(this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      })
    ));

  }

  @UseGuards(AuthGuard)
  @Get('verify-token')
  verifyToken(@User() user: CurrentUser, @Token() token: string) {
    return { user, token }
  }
}
