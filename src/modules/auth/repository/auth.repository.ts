import { Injectable } from '@nestjs/common';
import AuthEntity from '../entities/auth.entity';
import { DataSource, Repository, type UpdateResult } from 'typeorm';
import type CreateAuthDTO from '../dto/auth.dto';
import { type CreateUserDTO } from 'src/modules/user/dto/create-user.dto';

@Injectable()
export default class AuthRepository extends Repository<AuthEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(AuthEntity, dataSource.createEntityManager());
  }

  async createAuth(auth: CreateAuthDTO | any) {
    return await this.save(auth);
  }

  async getAllAuths(): Promise<AuthEntity[] | any[]> {
    return await this.find();
  }

  async getAuthByAuthId(authId: number): Promise<AuthEntity | null> {
    return await this.findOne({ where: { id: authId } });
  }

  async getAuthByUsername(username: string): Promise<AuthEntity | any> {
    return await this.findOne({ where: { username } });
  }

  async updateAuthByAuthId({
    authId,
    payload,
  }: {
    authId: number;
    payload: Partial<CreateUserDTO>;
  }): Promise<UpdateResult> {
    return await this.update(authId, payload);
  }
}
