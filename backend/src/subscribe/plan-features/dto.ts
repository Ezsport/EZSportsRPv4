import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SubPlanFeatureDto {
  @ApiProperty({ description: 'Plan ID' })
  @IsNotEmpty()
  @IsNumber()
  planId: number;

  @ApiProperty({ description: 'Feature ID' })
  @IsNotEmpty()
  @IsNumber()
  featureId: number;

  @ApiProperty({ description: 'Is included' })
  @IsNotEmpty()
  @IsNumber()
  isIncluded: number;

  @ApiProperty({ description: 'Notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Order' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;
}
