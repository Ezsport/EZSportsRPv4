import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class BaseCompetitionDto {
  @ApiProperty({ description: 'Name of the competition' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation', required: false })
  @IsOptional()
  @IsString()
  abbr?: string;

  @ApiProperty({ description: 'Sport ID', required: false })
  @IsOptional()
  @IsNumber()
  sportId?: number;

  @ApiProperty({ description: 'Note', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Status of the competition' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Start date', required: false })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({ description: 'End date', required: false })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({ description: 'Order', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number;

  @ApiProperty({ description: 'Base64 of the competition logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
