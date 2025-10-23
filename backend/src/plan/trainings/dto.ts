import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate } from 'class-validator';

export class PlanTrainingDto {
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

  @ApiProperty({ description: 'Training content', required: false })
  @IsOptional()
  @IsString()
  trainingContent?: string;

  @ApiProperty({ description: 'Is all members' })
  @IsNotEmpty()
  @IsNumber()
  isAllMembers: number;

  @ApiProperty({ description: 'Location ID', required: false })
  @IsOptional()
  @IsNumber()
  locationId?: number;

  @ApiProperty({ description: 'Recurring type' })
  @IsNotEmpty()
  @IsNumber()
  recurringType: number;

  @ApiProperty({ description: 'Status' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Created by', required: false })
  @IsOptional()
  @IsNumber()
  createdBy?: number;
}
