import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Customer } from '../../../domain/models/customer.model';
import { CUSTOMER_REPOSITORY } from '../../../main/config/constants';
@Injectable()
export class DeleteCustomerUseCase {
  protected logger: Logger = new Logger(DeleteCustomerUseCase.name);

  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: typeof Customer,
  ) {}

  async execute(id: string): Promise<void> {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      this.logger.error('Customer not found for the id: ' + id);
      throw new NotFoundException('Customer not found');
    }

    await customer.destroy();
  }
}
