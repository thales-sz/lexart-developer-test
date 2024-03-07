import { IsJWT, IsNotEmpty } from 'class-validator';

export class ValidateTokenDto {
  @IsJWT()
  @IsNotEmpty()
  token: string;
}
