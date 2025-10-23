import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class SubForTeamDto {
  @ApiProperty({ description: 'Team ID' })
  @IsNotEmpty()
  @IsNumber()
  teamId: number;

  @ApiProperty({ description: 'Plan ID' })
  @IsNotEmpty()
  @IsNumber()
  planId: number;

  @ApiProperty({ description: 'Status' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Started at' })
  @IsNotEmpty()
  @IsDate()
  startedAt: Date;

  @ApiProperty({ description: 'Expires at', required: false })
  @IsOptional()
  @IsDate()
  expiresAt?: Date;

  @ApiProperty({ description: 'Auto renew' })
  @IsNotEmpty()
  @IsNumber()
  autoRenew: number;

  @ApiProperty({ description: 'Payment method', required: false })
  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @ApiProperty({ description: 'Last payment at', required: false })
  @IsOptional()
  @IsDate()
  lastPaymentAt?: Date;

  @ApiProperty({ description: 'Next payment at', required: false })
  @IsOptional()
  @IsDate()
  nextPaymentAt?: Date;

  @ApiProperty({ description: 'Notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Order' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;
}
