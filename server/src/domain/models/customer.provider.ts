import { CUSTOMER_REPOSITORY } from '../../main/config/constants';
import { Customer } from './customer.model';

export const customerProvider = [
  {
    provide: CUSTOMER_REPOSITORY,
    useValue: Customer,
  },
];
