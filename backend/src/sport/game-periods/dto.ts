import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SportGamePeriodDto {
  @ApiProperty({ description: 'Sport ID of the game period' })
  @IsNotEmpty()
  @IsNumber()
  sportId: number;

  @ApiProperty({ description: 'Name of the game period' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Order of the game period' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Duration of the game period', required: false })
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiProperty({ description: 'Note for the game period', required: false })
  @IsOptional()
  @IsString()
  note?: string;
}
