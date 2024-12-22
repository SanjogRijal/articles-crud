/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { BadRequestException, Injectable } from '@nestjs/common';
import type { CreateUserDTO } from './dto/create-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  createUser = async (user: CreateUserDTO) => {
    const userExists = await this.userRepository.getUserByEmail(user.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    return await this.userRepository.createUser(user);
  };

  getAllUsers = async () => {
    return await this.userRepository.getAllNonDeletedUsers();
  };

  getOneUser = async (id: number) => {
    return await this.userRepository.getOneUser(id);
  };

  getUserByEmail = async (email: string) => {
    return await this.userRepository.find({ where: { email } });
  };

  updateUser = () => {
    return 'USER UPDATED';
  };

  deleteUser = () => {
    return 'USER DELETED';
  };
}
