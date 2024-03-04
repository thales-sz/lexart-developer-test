import { Body, Controller, Post } from '@nestjs/common';
import { SignInUseCase } from '../../application/use-cases/sign-in.usecase';
import { SignInDto } from '../../domain/dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }
}
