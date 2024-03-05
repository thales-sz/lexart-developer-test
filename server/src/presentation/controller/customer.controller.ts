import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { FindOneCustomerUseCase } from '@app/use-cases/customer';
import { Customer } from '@domain/models/customer.model';
import { FindCustomerUseCase } from '../../application/use-cases/customer/find-all.usecase';
import { UpdateCustomerUseCase } from '../../application/use-cases/customer/update.usecase';
import { DeleteCustomerUseCase } from '../../application/use-cases/customer/delete.usecase';
import { UpdateCustomerDto } from '../../domain/dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly findOneCustomer: FindOneCustomerUseCase,
    private readonly findCustomer: FindCustomerUseCase,
    private readonly updateCustomer: UpdateCustomerUseCase,
    private readonly deleteCustomer: DeleteCustomerUseCase,
  ) {}

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.findOneCustomer.execute(id);
  }

  @Get('/')
  async find() {
    return this.findCustomer.execute();
  }

  @Patch('/:id')
  async updatePartially(
    @Param('id') id: string,
    @Body() updateCustomer: UpdateCustomerDto,
  ) {
    return this.updateCustomer.execute(id, updateCustomer);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomer: UpdateCustomerDto,
  ) {
    return this.updateCustomer.execute(id, updateCustomer);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return this.deleteCustomer.execute(id);
  }
}
