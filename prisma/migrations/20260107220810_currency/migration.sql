-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "currency";

-- CreateTable
CREATE TABLE "currency"."CurrencyType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CurrencyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currency"."CurrencyRate" (
    "id" TEXT NOT NULL,
    "currencyTypeId" TEXT NOT NULL,
    "factor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CurrencyRate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "currency"."CurrencyRate" ADD CONSTRAINT "CurrencyRate_currencyTypeId_fkey" FOREIGN KEY ("currencyTypeId") REFERENCES "currency"."CurrencyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
