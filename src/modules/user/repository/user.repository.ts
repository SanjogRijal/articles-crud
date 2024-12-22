/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { type CreateUserDTO } from '../dto/create-user.dto';
import UserEntity from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  createUser = async (user: CreateUserDTO) => {
    return await this.save(user);
  };

  getAllNonDeletedUsers = async (): Promise<UserEntity[]> => {
    return await this.find({ where: { isDeleted: false } });
  };

  getAllUsersIncludingDeleted = async (): Promise<UserEntity[]> => {
    return await this.find();
  };

  getOneUser = async (id: number): Promise<UserEntity | null> => {
    const singleUser: UserEntity | null | undefined = await this.findOne({
      where: { id },
    });
    return singleUser;
  };

  getUserByEmail = async (email: string): Promise<UserEntity | null> => {
    const user: UserEntity | null = await this.findOne({
      where: { email },
    });
    return user;
  };
}
