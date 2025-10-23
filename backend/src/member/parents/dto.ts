import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MemberParentDto {
  @ApiProperty({ description: 'Person ID' })
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @ApiProperty({ description: 'Status of the parent' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Notes', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Order of the parent' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
