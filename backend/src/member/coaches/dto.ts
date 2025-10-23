import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MemberCoachDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'License number', required: false })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiProperty({ description: 'Certification', required: false })
  @IsOptional()
  @IsString()
  certification?: string;

  @ApiProperty({ description: 'Specialization', required: false })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({ description: 'Status of the coach' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Biography', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Order of the coach', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
