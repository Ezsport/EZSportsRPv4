import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDecimal } from 'class-validator';

export class MemberRefereeDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'License number' })
  @IsNotEmpty()
  @IsString()
  licenseNumber: string;

  @ApiProperty({ description: 'License level', required: false })
  @IsOptional()
  @IsString()
  licenseLevel?: string;

  @ApiProperty({ description: 'Certification', required: false })
  @IsOptional()
  @IsString()
  certification?: string;

  @ApiProperty({ description: 'Referee type' })
  @IsNotEmpty()
  @IsString()
  refereeType: string;

  @ApiProperty({ description: 'Specialization', required: false })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiProperty({ description: 'Languages', required: false })
  @IsOptional()
  @IsString()
  languages?: string;

  @ApiProperty({ description: 'Match fee', required: false })
  @IsOptional()
  @IsDecimal()
  matchFee?: number;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({ description: 'Status of the referee' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Biography', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Order of the referee' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
