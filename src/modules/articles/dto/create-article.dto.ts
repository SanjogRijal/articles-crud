import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class CreateAuthDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(110)
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  coverImage: string;

  @ApiPropertyOptional({
    type: 'string',
  })
  source?: string;
}
