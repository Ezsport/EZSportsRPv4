-- CreateTable
CREATE TABLE "BaseCompetition" (
    "id" DECIMAL(20,0) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(100),
    "sportId" DECIMAL(20,0),
    "note" TEXT,
    "status" VARCHAR(255) NOT NULL,
    "startDate" DATE,
    "endDate" DATE,
    "ord" INTEGER,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "base_competitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseCountry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbr" TEXT,
    "code" TEXT,
    "note" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseField" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbr" TEXT,
    "note" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sportIds" INTEGER[],
    "countryId" INTEGER,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseGroupLevel" (
    "id" DECIMAL(20,0) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(100),
    "note" TEXT,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "skillLevel" VARCHAR(100),
    "ord" INTEGER,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "base_group_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseSport" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "abbr" TEXT,
    "note" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "BaseSport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameEvent" (
    "id" DECIMAL(20,0) NOT NULL,
    "sportId" DECIMAL(20,0) NOT NULL,
    "competitionId" DECIMAL(20,0),
    "eventDate" DATE NOT NULL,
    "venue" VARCHAR(100),
    "status" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "game_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameMatche" (
    "id" DECIMAL(20,0) NOT NULL,
    "eventId" DECIMAL(20,0) NOT NULL,
    "homeTeamId" DECIMAL(20,0) NOT NULL,
    "awayTeamId" DECIMAL(20,0) NOT NULL,
    "homeTeamScore" INTEGER,
    "awayTeamScore" INTEGER,
    "status" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "game_matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchEvent" (
    "id" DECIMAL(20,0) NOT NULL,
    "matchId" DECIMAL(20,0) NOT NULL,
    "playerId" DECIMAL(20,0),
    "teamId" DECIMAL(20,0),
    "eventType" VARCHAR(255) NOT NULL,
    "minute" INTEGER NOT NULL,
    "second" INTEGER NOT NULL,
    "note" TEXT,
    "eventData" TEXT,
    "fieldX" DECIMAL(5,2),
    "fieldY" DECIMAL(5,2),
    "isConfirmed" SMALLINT NOT NULL,
    "createdBy" DECIMAL(20,0),
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "match_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchLineup" (
    "id" DECIMAL(20,0) NOT NULL,
    "matchId" DECIMAL(20,0) NOT NULL,
    "teamId" DECIMAL(20,0) NOT NULL,
    "formation" VARCHAR(100),
    "lineupData" TEXT,
    "announcedAt" TIMESTAMP(6),
    "isConfirmed" SMALLINT NOT NULL,
    "createdBy" DECIMAL(20,0),
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "match_lineups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchMedia" (
    "id" DECIMAL(20,0) NOT NULL,
    "matchId" DECIMAL(20,0) NOT NULL,
    "mediaType" VARCHAR(255) NOT NULL,
    "fileName" VARCHAR(100) NOT NULL,
    "filePath" VARCHAR(100) NOT NULL,
    "fileSize" BIGINT,
    "mimeType" VARCHAR(100),
    "note" TEXT,
    "category" VARCHAR(100),
    "isPublic" SMALLINT NOT NULL,
    "uploadedBy" DECIMAL(20,0),
    "uploadedAt" TIMESTAMP(6) NOT NULL,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "match_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchRoster" (
    "id" DECIMAL(20,0) NOT NULL,
    "matchId" DECIMAL(20,0) NOT NULL,
    "playerId" DECIMAL(20,0) NOT NULL,
    "teamId" DECIMAL(20,0) NOT NULL,
    "isStarting" SMALLINT NOT NULL,
    "isSubstitute" SMALLINT NOT NULL,
    "position" VARCHAR(100),
    "jerseyNumber" VARCHAR(100),
    "substitutionInMinute" INTEGER,
    "substitutionOutMinute" INTEGER,
    "substitutionReason" VARCHAR(255),
    "minutesPlayed" INTEGER,
    "status" VARCHAR(255) NOT NULL,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "match_roster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchStatistic" (
    "id" DECIMAL(20,0) NOT NULL,
    "matchId" DECIMAL(20,0) NOT NULL,
    "playerId" DECIMAL(20,0) NOT NULL,
    "teamId" DECIMAL(20,0) NOT NULL,
    "minutesPlayed" INTEGER NOT NULL,
    "goals" INTEGER NOT NULL,
    "assists" INTEGER NOT NULL,
    "shots" INTEGER NOT NULL,
    "shots_on_target" INTEGER NOT NULL,
    "passes" INTEGER NOT NULL,
    "passesCompleted" INTEGER NOT NULL,
    "passAccuracy" DECIMAL(5,2) NOT NULL,
    "tackles" INTEGER NOT NULL,
    "interceptions" INTEGER NOT NULL,
    "clearances" INTEGER NOT NULL,
    "blocks" INTEGER NOT NULL,
    "yellowCards" INTEGER NOT NULL,
    "redCards" INTEGER NOT NULL,
    "foulsCommitted" INTEGER NOT NULL,
    "foulsWon" INTEGER NOT NULL,
    "saves" INTEGER NOT NULL,
    "goalsConceded" INTEGER NOT NULL,
    "cleanSheets" INTEGER NOT NULL,
    "rating" DECIMAL(3,1),
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "match_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberClubAdmin" (
    "id" DECIMAL(20,0) NOT NULL,
    "personId" DECIMAL(20,0) NOT NULL,
    "clubId" DECIMAL(20,0) NOT NULL,
    "emergencyContactName" VARCHAR(100),
    "emergencyContactPhone" VARCHAR(100),
    "status" VARCHAR(255) NOT NULL,
    "bio" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "member_club_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberCoache" (
    "id" DECIMAL(20,0) NOT NULL,
    "personId" DECIMAL(20,0) NOT NULL,
    "licenseNumber" VARCHAR(100),
    "certification" VARCHAR(100),
    "specialization" VARCHAR(100),
    "emergencyContactName" VARCHAR(100),
    "emergencyContactPhone" VARCHAR(100),
    "status" VARCHAR(255) NOT NULL,
    "bio" TEXT,
    "ord" INTEGER,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "member_coaches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberParent" (
    "id" DECIMAL(20,0) NOT NULL,
    "personId" DECIMAL(20,0) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "member_parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberPerson" (
    "id" DECIMAL(20,0) NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),
    "phone" VARCHAR(100),
    "dob" DATE,
    "gender" VARCHAR(255),
    "address" VARCHAR(100),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "zipCode" VARCHAR(100),
    "countryId" DECIMAL(20,0),
    "photoPath" VARCHAR(100),
    "status" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "member_persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberPlayer" (
    "id" DECIMAL(20,0) NOT NULL,
    "personId" DECIMAL(20,0) NOT NULL,
    "height" DECIMAL(5,2),
    "weight" DECIMAL(5,2),
    "preferredFoot" VARCHAR(255),
    "contractStart" DATE,
    "contractEnd" DATE,
    "emergencyContactName" VARCHAR(100),
    "emergencyContactPhone" VARCHAR(100),
    "status" VARCHAR(255) NOT NULL,
    "bio" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "member_players_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberReferee" (
    "id" DECIMAL(20,0) NOT NULL,
    "personId" DECIMAL(20,0) NOT NULL,
    "licenseNumber" VARCHAR(100) NOT NULL,
    "licenseLevel" VARCHAR(100),
    "certification" VARCHAR(100),
    "refereeType" VARCHAR(255) NOT NULL,
    "specialization" VARCHAR(100),
    "languages" TEXT,
    "matchFee" DECIMAL(8,2),
    "emergencyContactName" VARCHAR(100),
    "emergencyContactPhone" VARCHAR(100),
    "status" VARCHAR(255) NOT NULL,
    "bio" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "member_referees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberSponsor" (
    "id" DECIMAL(20,0) NOT NULL,
    "companyName" VARCHAR(100) NOT NULL,
    "contactPerson" VARCHAR(100),
    "email" VARCHAR(100),
    "phone" VARCHAR(100),
    "website" VARCHAR(100),
    "sponsorLevel" VARCHAR(100),
    "sponsorshipAmount" DECIMAL(10,2),
    "contractStart" DATE,
    "contractEnd" DATE,
    "benefits" TEXT,
    "logoPath" VARCHAR(100),
    "status" VARCHAR(255) NOT NULL,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "member_sponsors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberTeamManager" (
    "id" DECIMAL(20,0) NOT NULL,
    "personId" DECIMAL(20,0) NOT NULL,
    "appointedDate" DATE,
    "emergencyContactName" VARCHAR(100),
    "emergencyContactPhone" VARCHAR(100),
    "status" VARCHAR(255) NOT NULL,
    "bio" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "member_team_managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgClub" (
    "id" DECIMAL(20,0) NOT NULL DEFAULT nextval('"BaseField_id_seq"'::regclass),
    "name" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(100),
    "note" TEXT,
    "foundedDate" DATE,
    "address" VARCHAR(100),
    "contactEmail" VARCHAR(100),
    "contactPhone" VARCHAR(100),
    "website" VARCHAR(100),
    "status" VARCHAR(255) NOT NULL,
    "ord" INTEGER,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "org_clubs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgLeague" (
    "id" DECIMAL(20,0) NOT NULL DEFAULT nextval('"BaseField_id_seq"'::regclass),
    "name" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(100),
    "note" TEXT,
    "gameModeId" DECIMAL(20,0),
    "groupLevelId" DECIMAL(20,0),
    "season" VARCHAR(100),
    "startDate" DATE,
    "endDate" DATE,
    "registrationDeadline" DATE,
    "maxTeams" INTEGER,
    "entryFee" DECIMAL(10,2),
    "subscribeEmail" VARCHAR(100),
    "rules" TEXT,
    "status" VARCHAR(255) NOT NULL,
    "ord" INTEGER,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "org_leagues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgTeam" (
    "id" DECIMAL(20,0) NOT NULL DEFAULT nextval('"BaseField_id_seq"'::regclass),
    "name" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(100),
    "note" TEXT,
    "clubId" DECIMAL(20,0),
    "sportId" DECIMAL(20,0),
    "leagueId" DECIMAL(20,0),
    "ageGroup" VARCHAR(100),
    "gender" SMALLINT,
    "skillLevel" VARCHAR(100),
    "color1" VARCHAR(100),
    "color2" VARCHAR(100),
    "maxPlayers" INTEGER,
    "status" SMALLINT NOT NULL,
    "ord" INTEGER,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "org_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanGame" (
    "id" DECIMAL(20,0) NOT NULL,
    "leagueId" DECIMAL(20,0),
    "gameName" VARCHAR(100),
    "homeTeamId" DECIMAL(20,0),
    "awayTeamId" DECIMAL(20,0),
    "startDatetime" TIMESTAMP(6) NOT NULL,
    "endDatetime" TIMESTAMP(6) NOT NULL,
    "duration" INTEGER,
    "uniform" VARCHAR(100),
    "locationId" DECIMAL(20,0),
    "isScrimmage" SMALLINT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "createdBy" DECIMAL(20,0),
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "plan_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanMeeting" (
    "id" DECIMAL(20,0) NOT NULL,
    "meetingCategory" SMALLINT,
    "teamId" DECIMAL(20,0),
    "startDatetime" TIMESTAMP(6) NOT NULL,
    "endDatetime" TIMESTAMP(6) NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "locationId" DECIMAL(20,0),
    "status" SMALLINT,
    "createdBy" DECIMAL(20,0),
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "plan_meetings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanTraining" (
    "id" DECIMAL(20,0) NOT NULL,
    "teamId" DECIMAL(20,0),
    "startDatetime" TIMESTAMP(6) NOT NULL,
    "endDatetime" TIMESTAMP(6) NOT NULL,
    "trainingContent" TEXT,
    "isAllMembers" SMALLINT NOT NULL,
    "locationId" DECIMAL(20,0),
    "recurringType" SMALLINT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "createdBy" DECIMAL(20,0),
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "plan_trainings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelClubClubAdmin" (
    "id" DECIMAL(20,0) NOT NULL,
    "clubId" DECIMAL(20,0) NOT NULL,
    "adminId" DECIMAL(20,0) NOT NULL,
    "joinedAt" TIMESTAMP(6),
    "leftAt" TIMESTAMP(6),
    "status" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "salary" DECIMAL(10,2),
    "contractStart" DATE,
    "contractEnd" DATE,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_club_club_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelCompetitionGroupLevel" (
    "id" DECIMAL(20,0) NOT NULL,
    "competitionId" DECIMAL(20,0) NOT NULL,
    "groupLevelId" DECIMAL(20,0) NOT NULL,
    "isPrimary" SMALLINT NOT NULL,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_competition_group_level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelFieldSport" (
    "id" DECIMAL(20,0) NOT NULL,
    "fieldId" DECIMAL(20,0) NOT NULL,
    "sportId" DECIMAL(20,0) NOT NULL,
    "isPrimary" SMALLINT NOT NULL,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_field_sport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelMatchReferee" (
    "id" DECIMAL(20,0) NOT NULL,
    "matchId" DECIMAL(20,0) NOT NULL,
    "refereeId" DECIMAL(20,0) NOT NULL,
    "assignedAt" TIMESTAMP(6),
    "confirmedAt" TIMESTAMP(6),
    "cancelledAt" TIMESTAMP(6),
    "status" VARCHAR(255) NOT NULL,
    "matchFee" DECIMAL(8,2),
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_match_referee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelPlayerParent" (
    "id" DECIMAL(20,0) NOT NULL,
    "playerId" DECIMAL(20,0) NOT NULL,
    "parentId" DECIMAL(20,0) NOT NULL,
    "assignedAt" TIMESTAMP(6),
    "removedAt" TIMESTAMP(6),
    "relationship" VARCHAR(100),
    "isPrimaryContact" SMALLINT NOT NULL,
    "canPickup" SMALLINT NOT NULL,
    "receivesNotifications" SMALLINT NOT NULL,
    "occupation" VARCHAR(100),
    "employer" VARCHAR(100),
    "workPhone" VARCHAR(100),
    "status" VARCHAR(255) NOT NULL,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_player_parents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelSponsorClub" (
    "id" DECIMAL(20,0) NOT NULL,
    "sponsorId" DECIMAL(20,0) NOT NULL,
    "clubId" DECIMAL(20,0) NOT NULL,
    "startedAt" TIMESTAMP(6),
    "endedAt" TIMESTAMP(6),
    "status" VARCHAR(255) NOT NULL,
    "sponsorshipAmount" DECIMAL(10,2),
    "benefits" TEXT,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_sponsor_club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelSponsorLeague" (
    "id" DECIMAL(20,0) NOT NULL,
    "sponsorId" DECIMAL(20,0) NOT NULL,
    "leagueId" DECIMAL(20,0) NOT NULL,
    "startedAt" TIMESTAMP(6),
    "endedAt" TIMESTAMP(6),
    "status" VARCHAR(255) NOT NULL,
    "sponsorshipAmount" DECIMAL(10,2),
    "benefits" TEXT,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_sponsor_league_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelSponsorTeam" (
    "id" DECIMAL(20,0) NOT NULL,
    "sponsorId" DECIMAL(20,0) NOT NULL,
    "teamId" DECIMAL(20,0) NOT NULL,
    "startedAt" TIMESTAMP(6),
    "endedAt" TIMESTAMP(6),
    "status" VARCHAR(255) NOT NULL,
    "sponsorshipAmount" DECIMAL(10,2),
    "benefits" TEXT,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_sponsor_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelTeamCoach" (
    "id" DECIMAL(20,0) NOT NULL,
    "teamId" DECIMAL(20,0) NOT NULL,
    "coachId" DECIMAL(20,0) NOT NULL,
    "joinedAt" TIMESTAMP(6),
    "leftAt" TIMESTAMP(6),
    "status" VARCHAR(255) NOT NULL,
    "coachTypeId" BIGINT,
    "salary" DECIMAL(10,2),
    "contractStart" DATE,
    "contractEnd" DATE,
    "responsibilities" TEXT,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_team_coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelTeamPlayer" (
    "id" DECIMAL(20,0) NOT NULL,
    "teamId" DECIMAL(20,0) NOT NULL,
    "playerId" DECIMAL(20,0) NOT NULL,
    "joinedAt" TIMESTAMP(6),
    "leftAt" TIMESTAMP(6),
    "status" VARCHAR(255) NOT NULL,
    "jerseyNumber" VARCHAR(100),
    "positionId" BIGINT,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_team_player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelTeamTeamManager" (
    "id" DECIMAL(20,0) NOT NULL,
    "teamId" DECIMAL(20,0) NOT NULL,
    "managerId" DECIMAL(20,0) NOT NULL,
    "joinedAt" TIMESTAMP(6),
    "leftAt" TIMESTAMP(6),
    "status" VARCHAR(255) NOT NULL,
    "managerTypeId" VARCHAR(255),
    "salary" DECIMAL(10,2),
    "contractStart" DATE,
    "contractEnd" DATE,
    "responsibilities" TEXT,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "rel_team_team_manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportCoachType" (
    "id" DECIMAL(20,0) NOT NULL,
    "sportId" DECIMAL(20,0) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "abbr" VARCHAR(100) NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "note" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "sport_coach_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportEventType" (
    "id" DECIMAL(20,0) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(100),
    "category" INTEGER,
    "evaluationMetric" INTEGER,
    "code" VARCHAR(100),
    "sportId" DECIMAL(20,0),
    "isVisible" SMALLINT NOT NULL,
    "note" TEXT,
    "ord" INTEGER,
    "score" INTEGER NOT NULL,
    "slot" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "sport_event_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportGamePeriod" (
    "id" DECIMAL(20,0) NOT NULL,
    "sportId" DECIMAL(20,0) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "ord" INTEGER NOT NULL,
    "duration" INTEGER,
    "note" TEXT,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "sport_game_periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportManagerType" (
    "id" DECIMAL(20,0) NOT NULL,
    "sportId" DECIMAL(20,0),
    "name" VARCHAR(50) NOT NULL,
    "abbr" VARCHAR(100) NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "note" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "sport_manager_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportPlayerPosition" (
    "id" DECIMAL(20,0) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(100) NOT NULL,
    "note" TEXT,
    "sportId" DECIMAL(20,0) NOT NULL,
    "ord" INTEGER,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "sport_player_positions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportRefereeType" (
    "id" DECIMAL(20,0) NOT NULL,
    "sportId" DECIMAL(20,0) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "abbr" VARCHAR(100) NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "note" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "sport_referee_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubFeature" (
    "id" DECIMAL(20,0) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "note" TEXT,
    "category" VARCHAR(100),
    "icon" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "subscription_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubForTeam" (
    "id" DECIMAL(20,0) NOT NULL,
    "teamId" DECIMAL(20,0) NOT NULL,
    "planId" DECIMAL(20,0) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "startedAt" TIMESTAMP(6) NOT NULL,
    "expiresAt" TIMESTAMP(6),
    "autoRenew" SMALLINT NOT NULL,
    "paymentMethod" VARCHAR(100),
    "lastPaymentAt" TIMESTAMP(6),
    "nextPaymentAt" TIMESTAMP(6),
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "subscription_for_team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubForUser" (
    "id" DECIMAL(20,0) NOT NULL,
    "userId" DECIMAL(20,0) NOT NULL,
    "planId" DECIMAL(20,0) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "startedAt" TIMESTAMP(6) NOT NULL,
    "expiresAt" TIMESTAMP(6),
    "autoRenew" SMALLINT NOT NULL,
    "paymentMethod" VARCHAR(100),
    "lastPaymentAt" TIMESTAMP(6),
    "nextPaymentAt" TIMESTAMP(6),
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "subscription_for_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubPlan" (
    "id" DECIMAL(20,0) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "planType" VARCHAR(255) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "isPopular" SMALLINT NOT NULL,
    "note" TEXT,
    "features" TEXT,
    "maxTeams" INTEGER,
    "maxPlayers" INTEGER,
    "maxCoaches" INTEGER,
    "maxReferees" INTEGER,
    "storageLimitGb" INTEGER,
    "isActive" SMALLINT NOT NULL,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "subscription_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubPlanFeature" (
    "id" DECIMAL(20,0) NOT NULL,
    "planId" DECIMAL(20,0) NOT NULL,
    "featureId" DECIMAL(20,0) NOT NULL,
    "isIncluded" SMALLINT NOT NULL,
    "notes" TEXT,
    "ord" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "sub_plan_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SysUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SysRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysPermission" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SysPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysUserRole" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "SysUserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "SysRolePermission" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "SysRolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateIndex
CREATE INDEX "base_competitions_sport_id_foreign" ON "BaseCompetition"("sportId");

-- CreateIndex
CREATE UNIQUE INDEX "BaseCountry_name_key" ON "BaseCountry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BaseField_name_key" ON "BaseField"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BaseSport_name_key" ON "BaseSport"("name");

-- CreateIndex
CREATE INDEX "game_events_competition_id_foreign" ON "GameEvent"("competitionId");

-- CreateIndex
CREATE INDEX "game_events_sport_id_foreign" ON "GameEvent"("sportId");

-- CreateIndex
CREATE INDEX "game_matches_away_team_id_foreign" ON "GameMatche"("awayTeamId");

-- CreateIndex
CREATE INDEX "game_matches_event_id_foreign" ON "GameMatche"("eventId");

-- CreateIndex
CREATE INDEX "game_matches_home_team_id_foreign" ON "GameMatche"("homeTeamId");

-- CreateIndex
CREATE INDEX "match_events_created_by_created_at_index" ON "MatchEvent"("createdBy", "createdAt");

-- CreateIndex
CREATE INDEX "match_events_match_id_event_type_index" ON "MatchEvent"("matchId", "eventType");

-- CreateIndex
CREATE INDEX "match_events_match_id_is_confirmed_index" ON "MatchEvent"("matchId", "isConfirmed");

-- CreateIndex
CREATE INDEX "match_events_match_id_minute_index" ON "MatchEvent"("matchId", "minute");

-- CreateIndex
CREATE INDEX "match_events_player_id_match_id_index" ON "MatchEvent"("playerId", "matchId");

-- CreateIndex
CREATE INDEX "match_events_team_id_match_id_index" ON "MatchEvent"("teamId", "matchId");

-- CreateIndex
CREATE INDEX "match_lineups_created_by_created_at_index" ON "MatchLineup"("createdBy", "createdAt");

-- CreateIndex
CREATE INDEX "match_lineups_formation_index" ON "MatchLineup"("formation");

-- CreateIndex
CREATE INDEX "match_lineups_match_id_is_confirmed_index" ON "MatchLineup"("matchId", "isConfirmed");

-- CreateIndex
CREATE INDEX "match_lineups_team_id_match_id_index" ON "MatchLineup"("teamId", "matchId");

-- CreateIndex
CREATE UNIQUE INDEX "match_lineups_match_id_team_id_unique" ON "MatchLineup"("matchId", "teamId");

-- CreateIndex
CREATE INDEX "match_media_is_public_uploaded_at_index" ON "MatchMedia"("isPublic", "uploadedAt");

-- CreateIndex
CREATE INDEX "match_media_match_id_category_index" ON "MatchMedia"("matchId", "category");

-- CreateIndex
CREATE INDEX "match_media_match_id_media_type_index" ON "MatchMedia"("matchId", "mediaType");

-- CreateIndex
CREATE INDEX "match_media_media_type_is_public_index" ON "MatchMedia"("mediaType", "isPublic");

-- CreateIndex
CREATE INDEX "match_media_uploaded_by_uploaded_at_index" ON "MatchMedia"("uploadedBy", "uploadedAt");

-- CreateIndex
CREATE INDEX "match_roster_match_id_is_starting_index" ON "MatchRoster"("matchId", "isStarting");

-- CreateIndex
CREATE INDEX "match_roster_match_id_is_substitute_index" ON "MatchRoster"("matchId", "isSubstitute");

-- CreateIndex
CREATE INDEX "match_roster_match_id_team_id_index" ON "MatchRoster"("matchId", "teamId");

-- CreateIndex
CREATE INDEX "match_roster_player_id_match_id_index" ON "MatchRoster"("playerId", "matchId");

-- CreateIndex
CREATE INDEX "match_roster_team_id_match_id_status_index" ON "MatchRoster"("teamId", "matchId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "match_roster_match_id_player_id_unique" ON "MatchRoster"("matchId", "playerId");

-- CreateIndex
CREATE INDEX "match_statistics_goals_assists_index" ON "MatchStatistic"("goals", "assists");

-- CreateIndex
CREATE INDEX "match_statistics_match_id_team_id_index" ON "MatchStatistic"("matchId", "teamId");

-- CreateIndex
CREATE INDEX "match_statistics_player_id_match_id_index" ON "MatchStatistic"("playerId", "matchId");

-- CreateIndex
CREATE INDEX "match_statistics_rating_index" ON "MatchStatistic"("rating");

-- CreateIndex
CREATE INDEX "match_statistics_team_id_match_id_index" ON "MatchStatistic"("teamId", "matchId");

-- CreateIndex
CREATE UNIQUE INDEX "match_statistics_match_id_player_id_unique" ON "MatchStatistic"("matchId", "playerId");

-- CreateIndex
CREATE INDEX "member_club_admins_admin_role_status_index" ON "MemberClubAdmin"("status");

-- CreateIndex
CREATE INDEX "member_club_admins_club_id_admin_role_index" ON "MemberClubAdmin"("clubId");

-- CreateIndex
CREATE INDEX "member_club_admins_ord_index" ON "MemberClubAdmin"("ord");

-- CreateIndex
CREATE INDEX "member_club_admins_person_id_index" ON "MemberClubAdmin"("personId");

-- CreateIndex
CREATE INDEX "member_coaches_person_id_foreign" ON "MemberCoache"("personId");

-- CreateIndex
CREATE INDEX "member_parents_ord_index" ON "MemberParent"("ord");

-- CreateIndex
CREATE INDEX "member_parents_person_id_index" ON "MemberParent"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "member_persons_email_unique" ON "MemberPerson"("email");

-- CreateIndex
CREATE INDEX "member_persons_country_id_foreign" ON "MemberPerson"("countryId");

-- CreateIndex
CREATE INDEX "member_players_base_sport_id_status_index" ON "MemberPlayer"("status");

-- CreateIndex
CREATE INDEX "member_players_ord_index" ON "MemberPlayer"("ord");

-- CreateIndex
CREATE INDEX "member_players_person_id_index" ON "MemberPlayer"("personId");

-- CreateIndex
CREATE UNIQUE INDEX "member_referees_license_number_unique" ON "MemberReferee"("licenseNumber");

-- CreateIndex
CREATE INDEX "member_referees_license_number_index" ON "MemberReferee"("licenseNumber");

-- CreateIndex
CREATE INDEX "member_referees_ord_index" ON "MemberReferee"("ord");

-- CreateIndex
CREATE INDEX "member_referees_person_id_index" ON "MemberReferee"("personId");

-- CreateIndex
CREATE INDEX "member_referees_referee_type_status_index" ON "MemberReferee"("refereeType", "status");

-- CreateIndex
CREATE INDEX "member_sponsors_contract_start_contract_end_index" ON "MemberSponsor"("contractStart", "contractEnd");

-- CreateIndex
CREATE INDEX "member_sponsors_ord_index" ON "MemberSponsor"("ord");

-- CreateIndex
CREATE INDEX "member_sponsors_sponsor_level_status_index" ON "MemberSponsor"("sponsorLevel", "status");

-- CreateIndex
CREATE INDEX "member_team_managers_manager_type_status_index" ON "MemberTeamManager"("status");

-- CreateIndex
CREATE INDEX "member_team_managers_ord_index" ON "MemberTeamManager"("ord");

-- CreateIndex
CREATE INDEX "member_team_managers_person_id_index" ON "MemberTeamManager"("personId");

-- CreateIndex
CREATE INDEX "org_leagues_game_mode_id_foreign" ON "OrgLeague"("gameModeId");

-- CreateIndex
CREATE INDEX "org_leagues_group_level_id_foreign" ON "OrgLeague"("groupLevelId");

-- CreateIndex
CREATE INDEX "org_teams_club_id_foreign" ON "OrgTeam"("clubId");

-- CreateIndex
CREATE INDEX "org_teams_league_id_foreign" ON "OrgTeam"("leagueId");

-- CreateIndex
CREATE INDEX "org_teams_sport_id_foreign" ON "OrgTeam"("sportId");

-- CreateIndex
CREATE INDEX "plan_games_away_team_id_foreign" ON "PlanGame"("awayTeamId");

-- CreateIndex
CREATE INDEX "plan_games_created_by_foreign" ON "PlanGame"("createdBy");

-- CreateIndex
CREATE INDEX "plan_games_home_team_id_foreign" ON "PlanGame"("homeTeamId");

-- CreateIndex
CREATE INDEX "plan_games_league_id_foreign" ON "PlanGame"("leagueId");

-- CreateIndex
CREATE INDEX "plan_games_location_id_foreign" ON "PlanGame"("locationId");

-- CreateIndex
CREATE INDEX "plan_meetings_created_by_foreign" ON "PlanMeeting"("createdBy");

-- CreateIndex
CREATE INDEX "plan_meetings_location_id_foreign" ON "PlanMeeting"("locationId");

-- CreateIndex
CREATE INDEX "plan_meetings_team_id_foreign" ON "PlanMeeting"("teamId");

-- CreateIndex
CREATE INDEX "plan_trainings_created_by_foreign" ON "PlanTraining"("createdBy");

-- CreateIndex
CREATE INDEX "plan_trainings_location_id_foreign" ON "PlanTraining"("locationId");

-- CreateIndex
CREATE INDEX "plan_trainings_team_id_foreign" ON "PlanTraining"("teamId");

-- CreateIndex
CREATE INDEX "rel_club_admin_admin_id_index" ON "RelClubClubAdmin"("adminId");

-- CreateIndex
CREATE INDEX "rel_club_admin_admin_id_status_index" ON "RelClubClubAdmin"("adminId", "status");

-- CreateIndex
CREATE INDEX "rel_club_admin_club_id_index" ON "RelClubClubAdmin"("clubId");

-- CreateIndex
CREATE INDEX "rel_club_admin_club_id_status_index" ON "RelClubClubAdmin"("clubId", "status");

-- CreateIndex
CREATE INDEX "rel_club_admin_role_status_index" ON "RelClubClubAdmin"("role", "status");

-- CreateIndex
CREATE UNIQUE INDEX "rel_club_admin_club_id_admin_id_unique" ON "RelClubClubAdmin"("clubId", "adminId");

-- CreateIndex
CREATE INDEX "rel_competition_group_level_competition_id_index" ON "RelCompetitionGroupLevel"("competitionId");

-- CreateIndex
CREATE INDEX "rel_competition_group_level_competition_id_is_primary_index" ON "RelCompetitionGroupLevel"("competitionId", "isPrimary");

-- CreateIndex
CREATE INDEX "rel_competition_group_level_group_level_id_index" ON "RelCompetitionGroupLevel"("groupLevelId");

-- CreateIndex
CREATE UNIQUE INDEX "rel_competition_group_level_competition_id_group_level_id_uniqu" ON "RelCompetitionGroupLevel"("competitionId", "groupLevelId");

-- CreateIndex
CREATE INDEX "rel_field_sport_field_id_index" ON "RelFieldSport"("fieldId");

-- CreateIndex
CREATE INDEX "rel_field_sport_field_id_is_primary_index" ON "RelFieldSport"("fieldId", "isPrimary");

-- CreateIndex
CREATE INDEX "rel_field_sport_sport_id_index" ON "RelFieldSport"("sportId");

-- CreateIndex
CREATE UNIQUE INDEX "rel_field_sport_field_id_sport_id_unique" ON "RelFieldSport"("fieldId", "sportId");

-- CreateIndex
CREATE INDEX "rel_match_referee_match_id_index" ON "RelMatchReferee"("matchId");

-- CreateIndex
CREATE INDEX "rel_match_referee_match_id_status_index" ON "RelMatchReferee"("matchId", "status");

-- CreateIndex
CREATE INDEX "rel_match_referee_referee_id_index" ON "RelMatchReferee"("refereeId");

-- CreateIndex
CREATE INDEX "rel_match_referee_referee_id_status_index" ON "RelMatchReferee"("refereeId", "status");

-- CreateIndex
CREATE INDEX "rel_match_referee_referee_role_status_index" ON "RelMatchReferee"("status");

-- CreateIndex
CREATE UNIQUE INDEX "rel_match_referee_match_id_referee_id_unique" ON "RelMatchReferee"("matchId", "refereeId");

-- CreateIndex
CREATE INDEX "rel_player_parents_parent_id_index" ON "RelPlayerParent"("parentId");

-- CreateIndex
CREATE INDEX "rel_player_parents_parent_id_status_index" ON "RelPlayerParent"("parentId", "status");

-- CreateIndex
CREATE INDEX "rel_player_parents_player_id_index" ON "RelPlayerParent"("playerId");

-- CreateIndex
CREATE INDEX "rel_player_parents_player_id_is_primary_contact_index" ON "RelPlayerParent"("playerId", "isPrimaryContact");

-- CreateIndex
CREATE INDEX "rel_player_parents_relationship_status_index" ON "RelPlayerParent"("relationship", "status");

-- CreateIndex
CREATE UNIQUE INDEX "rel_player_parents_player_id_parent_id_unique" ON "RelPlayerParent"("playerId", "parentId");

-- CreateIndex
CREATE INDEX "rel_sponsor_club_club_id_index" ON "RelSponsorClub"("clubId");

-- CreateIndex
CREATE INDEX "rel_sponsor_club_sponsor_id_index" ON "RelSponsorClub"("sponsorId");

-- CreateIndex
CREATE INDEX "rel_sponsor_club_status_started_at_index" ON "RelSponsorClub"("status", "startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "rel_sponsor_club_sponsor_id_club_id_unique" ON "RelSponsorClub"("sponsorId", "clubId");

-- CreateIndex
CREATE INDEX "rel_sponsor_league_league_id_index" ON "RelSponsorLeague"("leagueId");

-- CreateIndex
CREATE INDEX "rel_sponsor_league_sponsor_id_index" ON "RelSponsorLeague"("sponsorId");

-- CreateIndex
CREATE INDEX "rel_sponsor_league_status_started_at_index" ON "RelSponsorLeague"("status", "startedAt");

-- CreateIndex
CREATE UNIQUE INDEX "rel_sponsor_league_sponsor_id_league_id_unique" ON "RelSponsorLeague"("sponsorId", "leagueId");

-- CreateIndex
CREATE INDEX "rel_sponsor_team_sponsor_id_index" ON "RelSponsorTeam"("sponsorId");

-- CreateIndex
CREATE INDEX "rel_sponsor_team_status_started_at_index" ON "RelSponsorTeam"("status", "startedAt");

-- CreateIndex
CREATE INDEX "rel_sponsor_team_team_id_index" ON "RelSponsorTeam"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "rel_sponsor_team_sponsor_id_team_id_unique" ON "RelSponsorTeam"("sponsorId", "teamId");

-- CreateIndex
CREATE INDEX "rel_team_coach_coach_id_index" ON "RelTeamCoach"("coachId");

-- CreateIndex
CREATE INDEX "rel_team_coach_coach_id_status_index" ON "RelTeamCoach"("coachId", "status");

-- CreateIndex
CREATE INDEX "rel_team_coach_team_id_index" ON "RelTeamCoach"("teamId");

-- CreateIndex
CREATE INDEX "rel_team_coach_team_id_status_index" ON "RelTeamCoach"("teamId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "rel_team_coach_team_id_coach_id_unique" ON "RelTeamCoach"("teamId", "coachId");

-- CreateIndex
CREATE INDEX "rel_team_player_player_id_index" ON "RelTeamPlayer"("playerId");

-- CreateIndex
CREATE INDEX "rel_team_player_team_id_index" ON "RelTeamPlayer"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "rel_team_player_team_id_player_id_unique" ON "RelTeamPlayer"("teamId", "playerId");

-- CreateIndex
CREATE INDEX "rel_team_manager_manager_id_index" ON "RelTeamTeamManager"("managerId");

-- CreateIndex
CREATE INDEX "rel_team_manager_manager_id_status_index" ON "RelTeamTeamManager"("managerId", "status");

-- CreateIndex
CREATE INDEX "rel_team_manager_role_status_index" ON "RelTeamTeamManager"("managerTypeId", "status");

-- CreateIndex
CREATE INDEX "rel_team_manager_team_id_index" ON "RelTeamTeamManager"("teamId");

-- CreateIndex
CREATE INDEX "rel_team_manager_team_id_status_index" ON "RelTeamTeamManager"("teamId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "rel_team_manager_team_id_manager_id_unique" ON "RelTeamTeamManager"("teamId", "managerId");

-- CreateIndex
CREATE INDEX "sport_coach_types_sport_id_is_active_index" ON "SportCoachType"("sportId", "isActive");

-- CreateIndex
CREATE INDEX "sport_coach_types_sport_id_ord_index" ON "SportCoachType"("sportId", "ord");

-- CreateIndex
CREATE UNIQUE INDEX "sport_coach_types_sport_id_value_unique" ON "SportCoachType"("sportId", "name");

-- CreateIndex
CREATE INDEX "sport_event_types_sport_id_foreign" ON "SportEventType"("sportId");

-- CreateIndex
CREATE INDEX "sport_game_periods_sport_id_index" ON "SportGamePeriod"("sportId");

-- CreateIndex
CREATE INDEX "sport_game_periods_sport_id_ord_index" ON "SportGamePeriod"("sportId", "ord");

-- CreateIndex
CREATE INDEX "sport_manager_types_sport_id_is_active_index" ON "SportManagerType"("sportId", "isActive");

-- CreateIndex
CREATE INDEX "sport_manager_types_sport_id_ord_index" ON "SportManagerType"("sportId", "ord");

-- CreateIndex
CREATE UNIQUE INDEX "sport_manager_types_sport_id_value_unique" ON "SportManagerType"("sportId", "name");

-- CreateIndex
CREATE INDEX "sport_player_positions_sport_id_foreign" ON "SportPlayerPosition"("sportId");

-- CreateIndex
CREATE INDEX "sport_referee_types_sport_id_is_active_index" ON "SportRefereeType"("sportId", "isActive");

-- CreateIndex
CREATE INDEX "sport_referee_types_sport_id_ord_index" ON "SportRefereeType"("sportId", "ord");

-- CreateIndex
CREATE UNIQUE INDEX "sport_referee_types_sport_id_value_unique" ON "SportRefereeType"("sportId", "name");

-- CreateIndex
CREATE INDEX "subscription_features_category_is_active_index" ON "SubFeature"("category", "isActive");

-- CreateIndex
CREATE INDEX "subscription_features_is_active_index" ON "SubFeature"("isActive");

-- CreateIndex
CREATE INDEX "subscription_features_ord_index" ON "SubFeature"("ord");

-- CreateIndex
CREATE INDEX "rel_sub_for_team_expires_at_index" ON "SubForTeam"("expiresAt");

-- CreateIndex
CREATE INDEX "rel_sub_for_team_plan_id_status_index" ON "SubForTeam"("planId", "status");

-- CreateIndex
CREATE INDEX "rel_sub_for_team_status_expires_at_index" ON "SubForTeam"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "rel_sub_for_team_team_id_status_index" ON "SubForTeam"("teamId", "status");

-- CreateIndex
CREATE INDEX "rel_sub_for_user_expires_at_index" ON "SubForUser"("expiresAt");

-- CreateIndex
CREATE INDEX "rel_sub_for_user_plan_id_status_index" ON "SubForUser"("planId", "status");

-- CreateIndex
CREATE INDEX "rel_sub_for_user_status_expires_at_index" ON "SubForUser"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "rel_sub_for_user_user_id_status_index" ON "SubForUser"("userId", "status");

-- CreateIndex
CREATE INDEX "subscription_plans_is_popular_index" ON "SubPlan"("isPopular");

-- CreateIndex
CREATE INDEX "subscription_plans_plan_type_is_active_index" ON "SubPlan"("planType", "isActive");

-- CreateIndex
CREATE INDEX "subscription_plans_price_index" ON "SubPlan"("price");

-- CreateIndex
CREATE INDEX "rel_sub_features_feature_id_is_included_index" ON "SubPlanFeature"("featureId", "isIncluded");

-- CreateIndex
CREATE INDEX "rel_sub_features_plan_id_is_included_index" ON "SubPlanFeature"("planId", "isIncluded");

-- CreateIndex
CREATE UNIQUE INDEX "rel_sub_features_plan_id_feature_id_unique" ON "SubPlanFeature"("planId", "featureId");

-- CreateIndex
CREATE UNIQUE INDEX "SysUser_email_key" ON "SysUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SysRole_name_key" ON "SysRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SysPermission_action_key" ON "SysPermission"("action");

-- AddForeignKey
ALTER TABLE "SysUserRole" ADD CONSTRAINT "SysUserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "SysUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SysUserRole" ADD CONSTRAINT "SysUserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "SysRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SysRolePermission" ADD CONSTRAINT "SysRolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "SysRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SysRolePermission" ADD CONSTRAINT "SysRolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "SysPermission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
