import { IsString } from 'class-validator';

export class AuthUserResponce {
  @IsString()
  firstName: string;

  @IsString()
  userName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  token: string;
}
