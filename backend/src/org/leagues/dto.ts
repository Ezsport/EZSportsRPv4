import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsDecimal } from 'class-validator';

export class OrgLeagueDto {
  @ApiProperty({ description: 'Name of the league' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation of the league', required: false })
  @IsOptional()
  @IsString()
  abbr?: string;

  @ApiProperty({ description: 'Note for the league', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Game Mode ID', required: false })
  @IsOptional()
  @IsNumber()
  gameModeId?: number;

  @ApiProperty({ description: 'Group Level ID', required: false })
  @IsOptional()
  @IsNumber()
  groupLevelId?: number;

  @ApiProperty({ description: 'Season of the league', required: false })
  @IsOptional()
  @IsString()
  season?: string;

  @ApiProperty({ description: 'Start date of the league', required: false })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({ description: 'End date of the league', required: false })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({ description: 'Registration deadline', required: false })
  @IsOptional()
  @IsDate()
  registrationDeadline?: Date;

  @ApiProperty({ description: 'Maximum number of teams', required: false })
  @IsOptional()
  @IsNumber()
  maxTeams?: number;

  @ApiProperty({ description: 'Entry fee for the league', required: false })
  @IsOptional()
  @IsDecimal()
  entryFee?: number;

  @ApiProperty({ description: 'Subscribe email', required: false })
  @IsOptional()
  @IsString()
  subscribeEmail?: string;

  @ApiProperty({ description: 'League rules', required: false })
  @IsOptional()
  @IsString()
  rules?: string;

  @ApiProperty({ description: 'Status of the league' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Order of the league', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
 