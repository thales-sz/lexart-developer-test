import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInUseCase } from 'src/application/use-cases/auth/sign-in.usecase';
import { SignInDto } from 'src/domain/dto/sign-in.dto';
import { SignUpUseCase } from 'src/application/use-cases/auth/sign-up.usecase';
import { SignUpDto } from '../../domain/dto/sign-up.dto';
import { Public } from '../../main/config/environment/public-metadata';
import { ValidateTokenDto } from '../../domain/dto/validate-token.dto';
import { AuthService } from '../../domain/service/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
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

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('token')
  async validateToken(@Body() { token }: ValidateTokenDto) {
    console.log('token', token);
    return this.authService.validateToken(token);
  }
}
