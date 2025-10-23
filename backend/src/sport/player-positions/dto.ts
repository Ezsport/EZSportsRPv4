import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class SportPlayerPositionDto {
  @ApiProperty({ description: 'Unique identifier', required: false })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ description: 'Name of the player position' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation of the player position' })
  @IsNotEmpty()
  @IsString()
  abbr: string;

  @ApiProperty({ description: 'Note for the player position', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Sport ID of the player position' })
  @IsNotEmpty()
  @IsNumber()
  sportId: number;

  @ApiProperty({ description: 'Order of the player position', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number; 

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
