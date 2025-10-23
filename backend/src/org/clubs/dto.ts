import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class OrgClubDto {
  @ApiProperty({ description: 'Name of the club' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation of the club', required: false })
  @IsOptional()
  @IsString()
  abbr?: string;

  @ApiProperty({ description: 'Note for the club', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Founded date of the club', required: false })
  @IsOptional()
  @IsDate()
  foundedDate?: Date;

  @ApiProperty({ description: 'Address of the club', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Contact email of the club', required: false })
  @IsOptional()
  @IsString()
  contactEmail?: string;

  @ApiProperty({ description: 'Contact phone of the club', required: false })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiProperty({ description: 'Website of the club', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ description: 'Status of the club' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Order of the club', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
