import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SportCoachTypeDto {
  @ApiProperty({ description: 'Sport ID of the coach type' })
  @IsNotEmpty()
  @IsNumber()
  sportId: number;

  @ApiProperty({ description: 'Name of the coach type' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation of the coach type' })
  @IsNotEmpty()
  @IsString()
  abbr: string;

  @ApiProperty({ description: 'Color of the coach type' })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({ description: 'Note for the coach type', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Whether the coach type is active' })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Order of the coach type' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
