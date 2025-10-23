import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MemberClubAdminDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Club ID' })
  @IsNotEmpty()
  @IsNumber()
  clubId: number;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({ description: 'Status of the club admin' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Biography', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Order of the club admin' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
