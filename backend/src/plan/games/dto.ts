import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsInt, IsDecimal } from 'class-validator';

export class PlanGameDto {
  @ApiProperty({ description: 'League ID', required: false, example: 1 })
  @IsDecimal()
  @IsOptional()
  leagueId?: number;

  @ApiProperty({ description: 'Game name', required: false, example: 'Friendly Match' })
  @IsString()
  @IsOptional()
  gameName?: string;

  @ApiProperty({ description: 'Home Team ID', required: false, example: 1 })
  @IsDecimal()
  @IsOptional()
  homeTeamId?: number;

  @ApiProperty({ description: 'Away Team ID', required: false, example: 2 })
  @IsDecimal()
  @IsOptional()
  awayTeamId?: number;

  @ApiProperty({ description: 'Start datetime', required: true, example: '2023-01-01T15:00:00Z' })
  @IsDate()
  startDatetime: Date;

  @ApiProperty({ description: 'End datetime', required: true, example: '2023-01-01T17:00:00Z' })
  @IsDate()
  endDatetime: Date;

  @ApiProperty({ description: 'Game duration in minutes', required: false, example: 90 })
  @IsInt()
  @IsOptional()
  duration?: number;

  @ApiProperty({ description: 'Uniform details', required: false, example: 'Home team uniform' })
  @IsString()
  @IsOptional()
  uniform?: string;

  @ApiProperty({ description: 'Location ID', required: false, example: 1 })
  @IsDecimal()
  @IsOptional()
  locationId?: number;

  @ApiProperty({ description: 'Is this a scrimmage', required: false, example: 0 })
  @IsInt()
  @IsOptional()
  isScrimmage?: number = 0;

  @ApiProperty({ description: 'Status of the game', required: false, example: 'scheduled' })
  @IsString()
  @IsOptional()
  status?: string = 'scheduled';

  @ApiProperty({ description: 'Created by user ID', required: false, example: 1 })
  @IsDecimal()
  @IsOptional()
  createdBy?: number;

  @ApiProperty({ description: 'Created at timestamp', required: false })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ description: 'Updated at timestamp', required: false })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({ description: 'Base64 of the game logo', required: false })
  @IsString()
  @IsOptional()
  base64?: string;
}
