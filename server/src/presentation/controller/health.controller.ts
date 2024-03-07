import { Controller, Get } from '@nestjs/common';
import { Public } from '../../main/config/environment/public-metadata';

@Controller()
export class HealthController {
  @Public()
  @Get('/')
  public healthCheck() {
    return 'Welcome to the API!';
  }
}
