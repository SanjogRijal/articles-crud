import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignupSigninResponseDTO {
  @ApiProperty({
    description: 'Access Token for the signed up your',
    example: 'abcDEfgh12jlk123',
  })
  @IsString()
  accessToken: string;

  @ApiProperty({
    description: 'Refresh Token for the signed up your',
    example: 'abcDEfgh12jlk123',
  })
  @IsString()
  refreshToken: string;
}

export class SigninRequestDTO {
  @ApiProperty({
    description: 'Username which is User Email, for logging in',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password for logging in',
    example: 'password',
  })
  password: string;
}
