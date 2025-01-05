import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { user } from './models/user.model';
import { CreateUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(user) private readonly userRepository: typeof user,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async createUser(dto): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create(dto);
    return dto;
  }
}
