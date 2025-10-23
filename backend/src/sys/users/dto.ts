import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class SysUserDto {
  @ApiProperty({ description: 'First name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Email verified at', required: false })
  @IsOptional()
  @IsDate()
  emailVerifiedAt?: Date;

  @ApiProperty({ description: 'Password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'Status' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Person ID', required: false })
  @IsOptional()
  @IsNumber()
  personId?: number;

  @ApiProperty({ description: 'Remember token', required: false })
  @IsOptional()
  @IsString()
  rememberToken?: string;
}
