import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class PlanMeetingDto {
  @ApiProperty({ description: 'Meeting category', required: false })
  @IsOptional()
  @IsNumber()
  meetingCategory?: number;

  @ApiProperty({ description: 'Team ID', required: false })
  @IsOptional()
  @IsNumber()
  teamId?: number;

  @ApiProperty({ description: 'Start datetime' })
  @IsNotEmpty()
  @IsDate()
  startDatetime: Date;

  @ApiProperty({ description: 'End datetime' })
  @IsNotEmpty()
  @IsDate()
  endDatetime: Date;

  @ApiProperty({ description: 'Title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Content', required: false })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ description: 'Location ID', required: false })
  @IsOptional()
  @IsNumber()
  locationId?: number;

  @ApiProperty({ description: 'Status', required: false })
  @IsOptional()
  @IsNumber()
  status?: number;

  @ApiProperty({ description: 'Created by', required: false })
  @IsOptional()
  @IsNumber()
  createdBy?: number;
}
