import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@domain/service/auth/auth.service';
import { SignInDto } from '@domain/dto/sign-in.dto';
import { CUSTOMER_REPOSITORY } from '@main/config/constants';
import { Customer } from '../../../domain/models/customer.model';

type SignInResponse = {
  token: string;
};

@Injectable()
export class SignInUseCase {
  protected logger: Logger = new Logger(SignInUseCase.name);

  constructor(
    private readonly authService: AuthService,
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: typeof Customer,
  ) {}

  async execute({ email, password }: SignInDto): Promise<SignInResponse> {
    const customer = await this.customerRepository.findOne({
      where: { email },
    });

    if (!customer) {
      this.logger.error('Customer not found for the email: ' + email);
      throw new NotFoundException('Customer not found');
    }

    if (!this.authService.isPasswordValid(password, customer.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    delete customer.dataValues.password;

    const token = await this.authService.generateToken(customer.dataValues);

    return { token };
  }
}
