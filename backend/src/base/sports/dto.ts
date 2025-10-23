
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseSportDto {
  @ApiProperty({ description: 'Name of the sport' })
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

  @ApiProperty({ description: 'Is active' })
  @IsNotEmpty()
  @IsNumber()
  isActive: number;

  @ApiProperty({ description: 'Order' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}

