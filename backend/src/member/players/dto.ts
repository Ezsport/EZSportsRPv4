import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsDecimal } from 'class-validator';

export class MemberPlayerDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Height', required: false })
  @IsOptional()
  @IsDecimal()
  height?: number;

  @ApiProperty({ description: 'Weight', required: false })
  @IsOptional()
  @IsDecimal()
  weight?: number;

  @ApiProperty({ description: 'Preferred foot', required: false })
  @IsOptional()
  @IsString()
  preferredFoot?: string;

  @ApiProperty({ description: 'Contract start date', required: false })
  @IsOptional()
  @IsDate()
  contractStart?: Date;

  @ApiProperty({ description: 'Contract end date', required: false })
  @IsOptional()
  @IsDate()
  contractEnd?: Date;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({ description: 'Status of the player' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Biography', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Order of the player' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
