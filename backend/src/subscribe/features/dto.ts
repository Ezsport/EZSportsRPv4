import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubFeatureDto {
  @ApiProperty({ description: 'Name of the feature' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Note', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Category', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: 'Icon', required: false })
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty({ description: 'Is active' })
  @IsNotEmpty()
  @IsNumber()
  isActive: number;

  @ApiProperty({ description: 'Order' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;
}
