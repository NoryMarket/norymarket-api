/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "SupplyType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "quantityUnitId" TEXT NOT NULL,

    CONSTRAINT "SupplyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuantityUnit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "shortName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "QuantityUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplyTypeColors" (
    "supplyTypeId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "SupplyTypeColors_pkey" PRIMARY KEY ("colorId","supplyTypeId")
);

-- CreateTable
CREATE TABLE "SupplyTypeSizes" (
    "supplyTypeId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,

    CONSTRAINT "SupplyTypeSizes_pkey" PRIMARY KEY ("sizeId","supplyTypeId")
);

-- AddForeignKey
ALTER TABLE "SupplyType" ADD CONSTRAINT "SupplyType_quantityUnitId_fkey" FOREIGN KEY ("quantityUnitId") REFERENCES "QuantityUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyTypeColors" ADD CONSTRAINT "SupplyTypeColors_supplyTypeId_fkey" FOREIGN KEY ("supplyTypeId") REFERENCES "SupplyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyTypeColors" ADD CONSTRAINT "SupplyTypeColors_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyTypeSizes" ADD CONSTRAINT "SupplyTypeSizes_supplyTypeId_fkey" FOREIGN KEY ("supplyTypeId") REFERENCES "SupplyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyTypeSizes" ADD CONSTRAINT "SupplyTypeSizes_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
