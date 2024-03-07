import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Customer } from '../../../domain/models/customer.model';
import { CUSTOMER_REPOSITORY } from '../../../main/config/constants';
@Injectable()
export class FindCustomerUseCase {
  protected logger: Logger = new Logger(FindCustomerUseCase.name);

  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: typeof Customer,
  ) {}

  async execute(): Promise<Customer[]> {
    const customers = await this.customerRepository.findAll();

    if (!customers || customers.length === 0) {
      this.logger.error('Customers not found');
      throw new NotFoundException('Customers not found');
    }

    return customers;
  }
}
