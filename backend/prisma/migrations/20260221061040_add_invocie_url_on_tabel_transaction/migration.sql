/*
  Warnings:

  - The values [COMPLETED] on the enum `StatusTransaction` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusTransaction_new" AS ENUM ('PENDING', 'PAID', 'EXPIRED', 'FAILED');
ALTER TABLE "public"."Transaction" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Transaction" ALTER COLUMN "status" TYPE "StatusTransaction_new" USING ("status"::text::"StatusTransaction_new");
ALTER TYPE "StatusTransaction" RENAME TO "StatusTransaction_old";
ALTER TYPE "StatusTransaction_new" RENAME TO "StatusTransaction";
DROP TYPE "public"."StatusTransaction_old";
ALTER TABLE "Transaction" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "invoiceUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_externalId_key" ON "Transaction"("externalId");
