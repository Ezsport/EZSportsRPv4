import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDecimal } from 'class-validator';

export class SubPlanDto {
  @ApiProperty({ description: 'Name of the plan' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Plan type' })
  @IsNotEmpty()
  @IsString()
  planType: string;

  @ApiProperty({ description: 'Price' })
  @IsNotEmpty()
  @IsDecimal()
  price: number;

  @ApiProperty({ description: 'Is popular' })
  @IsNotEmpty()
  @IsNumber()
  isPopular: number;

  @ApiProperty({ description: 'Note', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Features', required: false })
  @IsOptional()
  @IsString()
  features?: string;

  @ApiProperty({ description: 'Maximum teams', required: false })
  @IsOptional()
  @IsNumber()
  maxTeams?: number;

  @ApiProperty({ description: 'Maximum players', required: false })
  @IsOptional()
  @IsNumber()
  maxPlayers?: number;

  @ApiProperty({ description: 'Maximum coaches', required: false })
  @IsOptional()
  @IsNumber()
  maxCoaches?: number;

  @ApiProperty({ description: 'Maximum referees', required: false })
  @IsOptional()
  @IsNumber()
  maxReferees?: number;

  @ApiProperty({ description: 'Storage limit (GB)', required: false })
  @IsOptional()
  @IsNumber()
  storageLimitGb?: number;

  @ApiProperty({ description: 'Is active' })
  @IsNotEmpty()
  @IsNumber()
  isActive: number;

  @ApiProperty({ description: 'Order' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;
}
