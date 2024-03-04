import { Controller, Delete, Get, Param, Patch, Put } from '@nestjs/common';
import { FindOneCustomerUseCase } from '@app/use-cases/customer';
import { Customer } from '@domain/models/customer.model';

@Controller('customer')
export class CustomerController {
  constructor(private readonly findOneCustomer: FindOneCustomerUseCase) {}

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.findOneCustomer.execute(id);
  }

  @Get('/')
  async find() {}

  @Patch('/:id')
  async updatePartially() {}

  @Put('/:id')
  async update() {}

  @Delete('/:id')
  async remove() {}
}
