-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "bom";

-- CreateTable
CREATE TABLE "bom"."BuildOfMaterials" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "shortName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BuildOfMaterials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bom"."BuildOfMaterialsRecipe" (
    "buildOfMaterialsId" TEXT NOT NULL,
    "supplyTypeId" TEXT NOT NULL,
    "supplyTypeQuantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BuildOfMaterialsRecipe_pkey" PRIMARY KEY ("buildOfMaterialsId","supplyTypeId")
);

-- AddForeignKey
ALTER TABLE "bom"."BuildOfMaterialsRecipe" ADD CONSTRAINT "BuildOfMaterialsRecipe_buildOfMaterialsId_fkey" FOREIGN KEY ("buildOfMaterialsId") REFERENCES "bom"."BuildOfMaterials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bom"."BuildOfMaterialsRecipe" ADD CONSTRAINT "BuildOfMaterialsRecipe_supplyTypeId_fkey" FOREIGN KEY ("supplyTypeId") REFERENCES "supplyType"."SupplyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
