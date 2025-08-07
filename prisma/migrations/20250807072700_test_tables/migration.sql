/*
  Warnings:

  - You are about to drop the `TestTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Location" AS ENUM ('AHMEDABAD', 'MUMBAI', 'DELHI');

-- DropTable
DROP TABLE "public"."TestTable";

-- CreateTable
CREATE TABLE "public"."Store" (
    "store_location" "public"."Location" NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "tax_percentage" DOUBLE PRECISION NOT NULL,
    "premium_items" TEXT[]
);

-- CreateTable
CREATE TABLE "public"."Plan" (
    "location" "public"."Location" NOT NULL,
    "valid_from" TEXT NOT NULL,
    "valid_to" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "half_price" INTEGER NOT NULL,
    "full_price" INTEGER NOT NULL,
    "extra_charge" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_location_key" ON "public"."Store"("store_location");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_location_key" ON "public"."Plan"("location");

-- AddForeignKey
ALTER TABLE "public"."Plan" ADD CONSTRAINT "Plan_location_fkey" FOREIGN KEY ("location") REFERENCES "public"."Store"("store_location") ON DELETE RESTRICT ON UPDATE CASCADE;
