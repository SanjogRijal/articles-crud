/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/return-await */
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { CreateUserDTO } from '../../user/dto/create-user.dto';
import { UserService } from '../../user/user.service';
import CreateAuthDTO from '../dto/auth.dto';
import { SigninRequestDTO } from '../dto/signup-signin.dto';
import {
  SignupSigninErrorResponseDTO,
  SignupSigninResponseDTO,
} from '../dto/signup_signin-response.dto';
import { LOGIN_EVENT_CALLBACKS } from '../events/event-callbacks';
import { loggedInEvent } from '../events/events';
import { AccessTokenGuard } from '../guards/AccessTokenGuard.guard';
import { RefreshTokenGuard } from '../guards/RefreshTokenGuard.guard';
import { AuthService } from '../service/auth.service';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // Swagger Docs for Controller
  @ApiOperation({
    summary: 'SIGN-UP',
    description: 'POST Request for Signing Up',
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
  @ApiResponse({
    status: 201,
    description: 'Successful Response for signup',
    type: SignupSigninResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Error when user exists or password does not match',
    type: SignupSigninErrorResponseDTO,
  })
  // NestJS Controller
  @Post('/sign-up')
  async signUp(
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    body: CreateUserDTO,
  ): Promise<SignupSigninResponseDTO> {
    const createdUser = await this.userService.createUser(body);
    const authData: CreateAuthDTO = {
      username: createdUser.email,
      password: body.password,
      userId: createdUser.id,
    };
    return await this.authService.signUp(authData);
  }

  @ApiOperation({
    summary: 'SIGN-IN',
    description: 'POST Request for Signing In',
  })
  @ApiBody({
    type: SigninRequestDTO,
    examples: {
      username: {},
      password: {},
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Successful Response for Signin In',
    type: SignupSigninResponseDTO,
  })
  @ApiBadRequestResponse({
    description: 'Error when user exists or password does not match',
    type: SignupSigninErrorResponseDTO,
  })
  // NestJS Controller
  @Post('/sign-in')
  async signIn(
    @Body(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    body: SigninRequestDTO,
  ): Promise<SignupSigninResponseDTO> {
    const signInUser: SignupSigninResponseDTO =
      await this.authService.signIn(body);
    loggedInEvent(LOGIN_EVENT_CALLBACKS);
    return signInUser;
  }

  @ApiOperation({
    summary: 'Endpoint for logging out user',
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() req: Request) {
    if (req?.user != null) return this.authService.logout(req?.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  async refreshTokens(@Req() req: Request | any) {
    const authId = req?.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(authId, refreshToken);
  }

  @ApiOperation({
    summary: 'Endpoint for Auth related tasks',
    description: 'AUTH ',
  })
  @Get()
  async getAllAuth() {
    return await this.authService.getAllAuths();
  }
}
