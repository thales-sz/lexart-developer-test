import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@domain/service/auth/auth.service';
import { SignInDto } from '@domain/dto/sign-in.dto';
import { CUSTOMER_REPOSITORY } from '@main/config/constants';
import { Customer } from '../../domain/models/customer.model';

type SignInResponse = {
  token: string;
};

@Injectable()
export class SignInUseCase {
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
      throw new NotFoundException('Customer not found');
    }

    if (!this.authService.isPasswordValid(password, customer.password)) {
      throw new UnauthorizedException('Invalid password');
    }

    delete customer.password;

    const token = await this.authService.generateToken(customer);

    return { token };
  }
}
