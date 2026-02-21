/*
  Warnings:

  - The values [PROCESSING] on the enum `StatusTransaction` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[transactionCode]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionCode` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusTransaction_new" AS ENUM ('COMPLETED', 'PENDING', 'FAILED');
ALTER TABLE "public"."Transaction" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Transaction" ALTER COLUMN "status" TYPE "StatusTransaction_new" USING ("status"::text::"StatusTransaction_new");
ALTER TYPE "StatusTransaction" RENAME TO "StatusTransaction_old";
ALTER TYPE "StatusTransaction_new" RENAME TO "StatusTransaction";
DROP TYPE "public"."StatusTransaction_old";
ALTER TABLE "Transaction" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transactionCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionCode_key" ON "Transaction"("transactionCode");
