export interface TypeReorder { [key: number]: number }


export type TypeSport = {
  id: number;
  name: string;
  abbr?: string;
  note?: string;
  ord?: number;
  base64?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface TypeCountry {
  id?: number;
  name: string;
  abbr?: string;
  code?: string;
  note?: string;
  base64?: string;
  isActive?: boolean;
  ord?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TypeField {
  id?: number;
  name: string;
  abbr?: string;
  base64?: string;
  countryId?: number;
  sportIds?: number[];
  note?: string;
  isActive?: boolean;
  ord?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BaseItem {
  id: string;
  name: string;
}

export interface TypeOrgTeam {
  id?: number;
  name: string;
  clubId?: number;
  sportId?: number;
  maxPlayers?: number;
  note?: string;
  isActive?: boolean;
  ord?: number;
  base64?: string;
}

export interface TypeOrgPlayer {
  id?: number;
  name: string;
  position: string;
  age: number;
  teamId?: number;
  team?: TypeOrgTeam;
  createdAt?: Date;
  updatedAt?: Date;
}