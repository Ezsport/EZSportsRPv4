import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrgTeamDto {
  @ApiProperty({ description: 'Name of the team' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation of the team', required: false })
  @IsOptional()
  @IsString()
  abbr?: string;

  @ApiProperty({ description: 'Note for the team', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Club ID', required: false })
  @IsOptional()
  @IsNumber()
  clubId?: number;

  @ApiProperty({ description: 'Sport ID', required: false })
  @IsOptional()
  @IsNumber()
  sportId?: number;

  @ApiProperty({ description: 'League ID', required: false })
  @IsOptional()
  @IsNumber()
  leagueId?: number;

  @ApiProperty({ description: 'Age group of the team', required: false })
  @IsOptional()
  @IsString()
  ageGroup?: string;

  @ApiProperty({ description: 'Gender of the team', required: false })
  @IsOptional()
  @IsNumber()
  gender?: number;

  @ApiProperty({ description: 'Skill level of the team', required: false })
  @IsOptional()
  @IsString()
  skillLevel?: string;

  @ApiProperty({ description: 'Primary team color', required: false })
  @IsOptional()
  @IsString()
  color1?: string;

  @ApiProperty({ description: 'Secondary team color', required: false })
  @IsOptional()
  @IsString()
  color2?: string;

  @ApiProperty({ description: 'Maximum number of players', required: false })
  @IsOptional()
  @IsNumber()
  maxPlayers?: number;

  @ApiProperty({ description: 'Status of the team' })
  @IsNotEmpty()
  @IsNumber()
  status: number;

  @ApiProperty({ description: 'Order of the team', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number;

  @ApiProperty({ description: 'Base64 of the sport logo', required: false })
  @IsOptional()
  @IsString()
  base64?: string;
}
 