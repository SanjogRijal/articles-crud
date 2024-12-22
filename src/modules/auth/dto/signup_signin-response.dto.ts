import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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

export class SignupSigninErrorResponseDTO {
  @ApiProperty({
    description: 'ERROR MESSAGE',
  })
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  error: string;

  @ApiProperty()
  @IsNumber()
  statusCode: number;
}
