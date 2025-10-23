import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class MemberPersonDto {
  @ApiProperty({ description: 'First name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Phone', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Date of birth', required: false })
  @IsOptional()
  @IsDate()
  dob?: Date;

  @ApiProperty({ description: 'Gender', required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ description: 'Address', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'City', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: 'State', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ description: 'Zip code', required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ description: 'Country ID', required: false })
  @IsOptional()
  @IsNumber()
  countryId?: number;

  @ApiProperty({ description: 'Photo path', required: false })
  @IsOptional()
  @IsString()
  photoPath?: string;

  @ApiProperty({ description: 'Status' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
