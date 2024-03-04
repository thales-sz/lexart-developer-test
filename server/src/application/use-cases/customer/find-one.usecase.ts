import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from '@main/config/constants';
import { Customer } from '@domain/models/customer.model';

@Injectable()
export class FindOneCustomerUseCase {
  protected logger: Logger = new Logger(FindOneCustomerUseCase.name);
  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: typeof Customer,
  ) {}
  async execute(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      this.logger.error('Customer not found for the id: ' + id);
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }
}
