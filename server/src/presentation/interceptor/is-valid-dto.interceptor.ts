import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateProductDto,
  CreateProductWithDataDto,
  CreateProductWithDetailsDto,
} from 'src/domain/dto';

@Injectable()
export class DTOValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;

    if (
      !(
        this.isProductWithDataDto(body) ||
        this.isProductWithDetailsDto(body) ||
        this.isProductDto(body)
      )
    ) {
      throw new BadRequestException('Invalid request body');
    }

    return next.handle();
  }

  private isProductWithDataDto(body: any): body is CreateProductWithDataDto[] {
    return (
      Array.isArray(body) &&
      body.every(
        (item: any) => item.name && item.brand && item.model && item.data,
      )
    );
  }

  private isProductWithDetailsDto(
    body: any,
  ): body is CreateProductWithDetailsDto {
    return body.name && body.details && body.price;
  }

  private isProductDto(body: any): body is CreateProductDto {
    return body.name && body.brand && body.model && body.color && body.price;
  }
}
