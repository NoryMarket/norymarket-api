-- AlterTable
ALTER TABLE "currency"."CurrencyType" ADD COLUMN     "decimals" INTEGER NOT NULL DEFAULT 2,
ADD COLUMN     "symbol" TEXT NOT NULL DEFAULT '$';
