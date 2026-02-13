-- CreateTable
CREATE TABLE "Specialties" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "icon" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Specialties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialties_title_key" ON "Specialties"("title");

-- CreateIndex
CREATE INDEX "idx_speciality_isDeleted" ON "Specialties"("isDeleted");

-- CreateIndex
CREATE INDEX "idx_speciality_title" ON "Specialties"("title");
