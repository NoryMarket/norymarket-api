/*
  Warnings:

  - You are about to drop the `SupplyTypeColors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SupplyTypeSizes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "supplyType"."SupplyTypeColors" DROP CONSTRAINT "SupplyTypeColors_colorId_fkey";

-- DropForeignKey
ALTER TABLE "supplyType"."SupplyTypeColors" DROP CONSTRAINT "SupplyTypeColors_supplyTypeId_fkey";

-- DropForeignKey
ALTER TABLE "supplyType"."SupplyTypeSizes" DROP CONSTRAINT "SupplyTypeSizes_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "supplyType"."SupplyTypeSizes" DROP CONSTRAINT "SupplyTypeSizes_supplyTypeId_fkey";

-- DropTable
DROP TABLE "supplyType"."SupplyTypeColors";

-- DropTable
DROP TABLE "supplyType"."SupplyTypeSizes";

-- CreateTable
CREATE TABLE "supplyType"."_ColorToSupplyType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ColorToSupplyType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "supplyType"."_SizeToSupplyType" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SizeToSupplyType_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ColorToSupplyType_B_index" ON "supplyType"."_ColorToSupplyType"("B");

-- CreateIndex
CREATE INDEX "_SizeToSupplyType_B_index" ON "supplyType"."_SizeToSupplyType"("B");

-- AddForeignKey
ALTER TABLE "supplyType"."_ColorToSupplyType" ADD CONSTRAINT "_ColorToSupplyType_A_fkey" FOREIGN KEY ("A") REFERENCES "supplyType"."Color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplyType"."_ColorToSupplyType" ADD CONSTRAINT "_ColorToSupplyType_B_fkey" FOREIGN KEY ("B") REFERENCES "supplyType"."SupplyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplyType"."_SizeToSupplyType" ADD CONSTRAINT "_SizeToSupplyType_A_fkey" FOREIGN KEY ("A") REFERENCES "supplyType"."Size"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplyType"."_SizeToSupplyType" ADD CONSTRAINT "_SizeToSupplyType_B_fkey" FOREIGN KEY ("B") REFERENCES "supplyType"."SupplyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
