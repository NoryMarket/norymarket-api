-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "configuration";

-- CreateTable
CREATE TABLE "configuration"."Configuration" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("key")
);
