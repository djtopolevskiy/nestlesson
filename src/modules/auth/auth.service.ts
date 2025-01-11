import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/common/constants/errors';
import { TokenService } from '../token/token.service';
import { CreateUserDTO } from '../user/dto';
import { UserService } from '../user/user.service';
import { UserLoginDTO } from './dto';
import { AuthUserResponce } from './response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    return this.userService.createUser(dto);
  }

  async loginUsers(dto: UserLoginDTO): Promise<AuthUserResponce> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    const userData = { name: existUser.firstName, email: existUser.email };
    const token = await this.tokenService.generateJwtToken(userData);
    const user = await this.userService.publicUser(dto.email);
    return { ...user, token };
  }
}
