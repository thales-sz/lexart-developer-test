import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CUSTOMER_REPOSITORY } from '../../../main/config/constants';
import { Customer } from '../../../domain/models/customer.model';
import { UpdateCustomerDto } from '../../../domain/dto/update-customer.dto';

@Injectable()
export class UpdateCustomerUseCase {
  protected logger: Logger = new Logger(UpdateCustomerUseCase.name);

  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: typeof Customer,
  ) {}

  async execute(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<void> {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      this.logger.error('Customer not found for the id: ' + id);
      throw new NotFoundException('Customer not found');
    }

    await customer.update({ ...updateCustomerDto });
  }
}
