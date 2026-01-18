/*
  Warnings:

  - You are about to drop the column `readonly` on the `CurrencyRate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "currency"."CurrencyRate" DROP COLUMN "readonly",
ADD COLUMN     "isReadonly" BOOLEAN NOT NULL DEFAULT false;
