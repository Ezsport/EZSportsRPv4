import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseGroupLevelDto {
  @ApiProperty({ description: 'Name of the group level' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation', required: false })
  @IsOptional()
  @IsString()
  abbr?: string;

  @ApiProperty({ description: 'Note', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Minimum age', required: false })
  @IsOptional()
  @IsNumber()
  minAge?: number;

  @ApiProperty({ description: 'Maximum age', required: false })
  @IsOptional()
  @IsNumber()
  maxAge?: number;

  @ApiProperty({ description: 'Skill level', required: false })
  @IsOptional()
  @IsString()
  skillLevel?: string;

  @ApiProperty({ description: 'Order', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}