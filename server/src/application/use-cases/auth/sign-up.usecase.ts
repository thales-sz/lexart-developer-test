import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '@domain/service/auth/auth.service';
import { CUSTOMER_REPOSITORY } from '@main/config/constants';
import { Customer } from '@domain/models/customer.model';
import { SignUpDto } from '@domain/dto/sign-up.dto';

type SignUpResponse = {
  customer: Customer;
};

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly authService: AuthService,
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: typeof Customer,
  ) {}

  async execute(customerDto: SignUpDto): Promise<SignUpResponse> {
    const customer = await this.customerRepository.findOne({
      where: { email: customerDto.email },
    });

    if (customer) {
      throw new ConflictException('Already exists a customer with this email');
    }

    const hashedPassword = this.authService.encodePassword(
      customerDto.password,
    );

    const newCustomer = await this.customerRepository.create({
      ...customerDto,
      password: hashedPassword,
    });

    return { customer: newCustomer };
  }
}
