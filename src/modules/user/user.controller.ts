import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import UserEntity from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Swagger Docs for Controller
  @ApiOperation({
    summary: 'CREATE USER',
    description: 'POST request to create user',
  })
  @ApiBody({
    type: CreateUserDTO,
    examples: {
      firstname: {},
      middlename: {},
      lastname: {},
      fullname: {},
      email: {},
      password: {},
      phone: {},
      permanentAddress: {},
      temporaryAddress: {},
      facebookProfileLink: {},
      instagramProfileLink: {},
      linkedInProfileLink: {},
      citizenshipNumber: {},
      passportNumber: {},
      panNumber: {},
    },
  })
  // NestJS Controller
  @Post()
  async createUser(
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    body: CreateUserDTO,
  ): Promise<UserEntity | any> {
    const createdUser = await this.userService.createUser(body);
    return createdUser;
  }
}
