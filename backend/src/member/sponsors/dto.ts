import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsDecimal } from 'class-validator';

export class MemberSponsorDto {
  @ApiProperty({ description: 'Company name' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({ description: 'Contact person', required: false })
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @ApiProperty({ description: 'Email', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Phone', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Website', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ description: 'Sponsor level', required: false })
  @IsOptional()
  @IsString()
  sponsorLevel?: string;

  @ApiProperty({ description: 'Sponsorship amount', required: false })
  @IsOptional()
  @IsDecimal()
  sponsorshipAmount?: number;

  @ApiProperty({ description: 'Contract start date', required: false })
  @IsOptional()
  @IsDate()
  contractStart?: Date;

  @ApiProperty({ description: 'Contract end date', required: false })
  @IsOptional()
  @IsDate()
  contractEnd?: Date;

  @ApiProperty({ description: 'Benefits', required: false })
  @IsOptional()
  @IsString()
  benefits?: string;

  @ApiProperty({ description: 'Logo path', required: false })
  @IsOptional()
  @IsString()
  logoPath?: string;

  @ApiProperty({ description: 'Status of the sponsor' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Order of the sponsor' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
