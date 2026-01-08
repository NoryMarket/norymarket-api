-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "supply";

-- CreateTable
CREATE TABLE "supply"."Supply" (
    "id" TEXT NOT NULL,
    "supplyTypeId" TEXT NOT NULL,
    "supplyTypeSizeId" TEXT NOT NULL,
    "supplyTypeColorId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT,
    "batchPrice" DOUBLE PRECISION NOT NULL,
    "buyCurrencyRateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Supply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supply"."SupplyWaste" (
    "id" TEXT NOT NULL,
    "supplyId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SupplyWaste_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "supply"."Supply" ADD CONSTRAINT "Supply_supplyTypeId_fkey" FOREIGN KEY ("supplyTypeId") REFERENCES "supplyType"."SupplyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supply"."Supply" ADD CONSTRAINT "Supply_supplyTypeSizeId_fkey" FOREIGN KEY ("supplyTypeSizeId") REFERENCES "supplyType"."Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supply"."Supply" ADD CONSTRAINT "Supply_supplyTypeColorId_fkey" FOREIGN KEY ("supplyTypeColorId") REFERENCES "supplyType"."Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supply"."Supply" ADD CONSTRAINT "Supply_buyCurrencyRateId_fkey" FOREIGN KEY ("buyCurrencyRateId") REFERENCES "currency"."CurrencyRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supply"."SupplyWaste" ADD CONSTRAINT "SupplyWaste_supplyId_fkey" FOREIGN KEY ("supplyId") REFERENCES "supply"."Supply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
