-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "order";

-- CreateTable
CREATE TABLE "order"."SellableProduct" (
    "id" TEXT NOT NULL,
    "buildOfMaterialsId" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "sellPrice" DOUBLE PRECISION NOT NULL,
    "currencyRateId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "expireDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SellableProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order"."SellableProductAllowedCurrencies" (
    "sellableProductId" TEXT NOT NULL,
    "currencyId" TEXT NOT NULL,

    CONSTRAINT "SellableProductAllowedCurrencies_pkey" PRIMARY KEY ("currencyId","sellableProductId")
);

-- CreateTable
CREATE TABLE "order"."Order" (
    "id" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order"."OrderProducts" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "sellableProductId" TEXT NOT NULL,
    "sellableProductSizeId" TEXT NOT NULL,
    "sellableProductColorId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OrderProducts_pkey" PRIMARY KEY ("sellableProductId","sellableProductSizeId","orderId","sellableProductColorId")
);

-- CreateTable
CREATE TABLE "order"."ProductionRun" (
    "id" TEXT NOT NULL,
    "orderProductsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductionRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order"."ProductionRunWaste" (
    "id" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductionRunWaste_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderProducts_id_key" ON "order"."OrderProducts"("id");

-- AddForeignKey
ALTER TABLE "order"."SellableProduct" ADD CONSTRAINT "SellableProduct_buildOfMaterialsId_fkey" FOREIGN KEY ("buildOfMaterialsId") REFERENCES "bom"."BuildOfMaterials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order"."SellableProduct" ADD CONSTRAINT "SellableProduct_currencyRateId_fkey" FOREIGN KEY ("currencyRateId") REFERENCES "currency"."CurrencyRate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order"."SellableProductAllowedCurrencies" ADD CONSTRAINT "SellableProductAllowedCurrencies_sellableProductId_fkey" FOREIGN KEY ("sellableProductId") REFERENCES "order"."SellableProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order"."SellableProductAllowedCurrencies" ADD CONSTRAINT "SellableProductAllowedCurrencies_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currency"."CurrencyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order"."OrderProducts" ADD CONSTRAINT "OrderProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order"."OrderProducts" ADD CONSTRAINT "OrderProducts_sellableProductId_fkey" FOREIGN KEY ("sellableProductId") REFERENCES "order"."SellableProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order"."OrderProducts" ADD CONSTRAINT "OrderProducts_sellableProductSizeId_fkey" FOREIGN KEY ("sellableProductSizeId") REFERENCES "supplyType"."Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order"."OrderProducts" ADD CONSTRAINT "OrderProducts_sellableProductColorId_fkey" FOREIGN KEY ("sellableProductColorId") REFERENCES "supplyType"."Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order"."ProductionRun" ADD CONSTRAINT "ProductionRun_orderProductsId_fkey" FOREIGN KEY ("orderProductsId") REFERENCES "order"."OrderProducts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
