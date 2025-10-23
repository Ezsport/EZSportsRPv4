/*
  Warnings:

  - A unique constraint covering the columns `[personId]` on the table `SysUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MemberPerson" ADD COLUMN     "address" VARCHAR(500),
ADD COLUMN     "city" VARCHAR(100),
ADD COLUMN     "countryId" TEXT,
ADD COLUMN     "dob" DATE,
ADD COLUMN     "gender" VARCHAR(20),
ADD COLUMN     "phone" VARCHAR(20),
ADD COLUMN     "photoPath" VARCHAR(255),
ADD COLUMN     "state" VARCHAR(100),
ADD COLUMN     "zipCode" VARCHAR(20);

-- AlterTable
ALTER TABLE "SysUser" ADD COLUMN     "personId" TEXT;

-- CreateTable
CREATE TABLE "BaseCountry" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(10),
    "code" VARCHAR(5),
    "note" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseField" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(20),
    "note" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "countryId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelFieldSport" (
    "id" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "sportId" TEXT NOT NULL,
    "isPrimary" SMALLINT NOT NULL DEFAULT 0,
    "notes" TEXT,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelFieldSport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberPlayer" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "teamId" TEXT,
    "sportId" TEXT,
    "position" VARCHAR(100),
    "jerseyNo" VARCHAR(10),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MemberPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgTeam" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sportId" TEXT,
    "clubId" TEXT,
    "leagueId" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportCoachType" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sportId" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportCoachType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportPlayerPosition" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sportId" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportPlayerPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportRefereeType" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sportId" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportRefereeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportEventType" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sportId" TEXT,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportEventType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SportGamePeriod" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "sportId" TEXT,
    "description" TEXT,
    "duration" SMALLINT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportGamePeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BaseCompetition" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "sportId" TEXT,
    "description" TEXT,
    "startDate" DATE,
    "endDate" DATE,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseCompetition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BaseCountry_name_key" ON "BaseCountry"("name");

-- CreateIndex
CREATE INDEX "BaseCountry_name_code_isActive_idx" ON "BaseCountry"("name", "code", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "BaseField_name_key" ON "BaseField"("name");

-- CreateIndex
CREATE INDEX "BaseField_name_isActive_idx" ON "BaseField"("name", "isActive");

-- CreateIndex
CREATE INDEX "RelFieldSport_sportId_isPrimary_idx" ON "RelFieldSport"("sportId", "isPrimary");

-- CreateIndex
CREATE UNIQUE INDEX "RelFieldSport_fieldId_sportId_key" ON "RelFieldSport"("fieldId", "sportId");

-- CreateIndex
CREATE UNIQUE INDEX "MemberPlayer_personId_key" ON "MemberPlayer"("personId");

-- CreateIndex
CREATE INDEX "MemberPlayer_personId_teamId_sportId_status_idx" ON "MemberPlayer"("personId", "teamId", "sportId", "status");

-- CreateIndex
CREATE INDEX "OrgTeam_name_sportId_status_idx" ON "OrgTeam"("name", "sportId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SportCoachType_name_key" ON "SportCoachType"("name");

-- CreateIndex
CREATE INDEX "SportCoachType_name_sportId_isActive_idx" ON "SportCoachType"("name", "sportId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "SportPlayerPosition_name_key" ON "SportPlayerPosition"("name");

-- CreateIndex
CREATE INDEX "SportPlayerPosition_name_sportId_isActive_idx" ON "SportPlayerPosition"("name", "sportId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "SportRefereeType_name_key" ON "SportRefereeType"("name");

-- CreateIndex
CREATE INDEX "SportRefereeType_name_sportId_isActive_idx" ON "SportRefereeType"("name", "sportId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "SportEventType_name_key" ON "SportEventType"("name");

-- CreateIndex
CREATE INDEX "SportEventType_name_sportId_isActive_idx" ON "SportEventType"("name", "sportId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "SportGamePeriod_name_key" ON "SportGamePeriod"("name");

-- CreateIndex
CREATE INDEX "SportGamePeriod_name_sportId_isActive_idx" ON "SportGamePeriod"("name", "sportId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "BaseCompetition_name_key" ON "BaseCompetition"("name");

-- CreateIndex
CREATE INDEX "BaseCompetition_name_sportId_status_idx" ON "BaseCompetition"("name", "sportId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SysUser_personId_key" ON "SysUser"("personId");

-- AddForeignKey
ALTER TABLE "BaseField" ADD CONSTRAINT "BaseField_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "BaseCountry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelFieldSport" ADD CONSTRAINT "RelFieldSport_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "BaseField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelFieldSport" ADD CONSTRAINT "RelFieldSport_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "BaseSport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberPerson" ADD CONSTRAINT "MemberPerson_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "BaseCountry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SysUser" ADD CONSTRAINT "SysUser_personId_fkey" FOREIGN KEY ("personId") REFERENCES "MemberPerson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberPlayer" ADD CONSTRAINT "MemberPlayer_personId_fkey" FOREIGN KEY ("personId") REFERENCES "MemberPerson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberPlayer" ADD CONSTRAINT "MemberPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "OrgTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberPlayer" ADD CONSTRAINT "MemberPlayer_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "BaseSport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgTeam" ADD CONSTRAINT "OrgTeam_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "BaseSport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportCoachType" ADD CONSTRAINT "SportCoachType_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "BaseSport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportPlayerPosition" ADD CONSTRAINT "SportPlayerPosition_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "BaseSport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportRefereeType" ADD CONSTRAINT "SportRefereeType_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "BaseSport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportEventType" ADD CONSTRAINT "SportEventType_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "BaseSport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SportGamePeriod" ADD CONSTRAINT "SportGamePeriod_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "BaseSport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BaseCompetition" ADD CONSTRAINT "BaseCompetition_sportId_fkey" FOREIGN KEY ("sportId") REFERENCES "BaseSport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
