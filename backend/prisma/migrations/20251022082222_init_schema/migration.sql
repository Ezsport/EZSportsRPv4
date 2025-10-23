-- CreateTable
CREATE TABLE "BaseSport" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "abbr" VARCHAR(20),
    "note" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ord" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseSport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberPerson" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "MemberPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SysUser" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SysUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BaseSport_name_key" ON "BaseSport"("name");

-- CreateIndex
CREATE INDEX "BaseSport_name_isActive_idx" ON "BaseSport"("name", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "MemberPerson_email_key" ON "MemberPerson"("email");

-- CreateIndex
CREATE INDEX "MemberPerson_firstName_lastName_email_status_idx" ON "MemberPerson"("firstName", "lastName", "email", "status");

-- CreateIndex
CREATE UNIQUE INDEX "SysUser_email_key" ON "SysUser"("email");

-- CreateIndex
CREATE INDEX "SysUser_email_status_idx" ON "SysUser"("email", "status");
