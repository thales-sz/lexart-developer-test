import { PartialType } from '@nestjs/mapped-types';
import { SignUpDto } from './sign-up.dto';

export class UpdateCustomerDto extends PartialType(SignUpDto) {}
