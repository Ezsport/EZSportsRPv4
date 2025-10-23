import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SportEventTypeDto {
  @ApiProperty({ description: 'Name of the event type' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation of the event type', required: false })
  @IsOptional()
  @IsString()
  abbr?: string;

  @ApiProperty({ description: 'Category of the event type', required: false })
  @IsOptional()
  @IsNumber()
  category?: number;

  @ApiProperty({ description: 'Evaluation metric', required: false })
  @IsOptional()
  @IsNumber()
  evaluationMetric?: number;

  @ApiProperty({ description: 'Code of the event type', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'Sport ID of the event type', required: false })
  @IsOptional()
  @IsNumber()
  sportId?: number;

  @ApiProperty({ description: 'Visibility of the event type' })
  @IsNotEmpty()
  @IsNumber()
  isVisible: number;

  @ApiProperty({ description: 'Note for the event type', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Order of the event type', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number;

  @ApiProperty({ description: 'Score of the event type' })
  @IsNotEmpty()
  @IsNumber()
  score: number;

  @ApiProperty({ description: 'Slot of the event type' })
  @IsNotEmpty()
  @IsNumber()
  slot: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
