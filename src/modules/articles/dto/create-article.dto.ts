import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateAuthDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  coverImage: number;

  @ApiPropertyOptional()
  source?: string;
}
