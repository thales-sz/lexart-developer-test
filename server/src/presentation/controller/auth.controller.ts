import { Body, Controller, Post } from '@nestjs/common';
import { SignInUseCase } from '@app/use-cases/sign-in.usecase';
import { SignInDto } from '@domain/dto/sign-in.dto';
import { SignUpUseCase } from '@app/use-cases/sign-up.usecase';
import { SignUpDto } from '../../domain/dto/sign-up.dto';
import { Public } from '../../main/config/environment/public-metadata';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUseCase: SignUpUseCase,
  ) {}

  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }
}
