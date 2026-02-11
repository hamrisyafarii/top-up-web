/*
  Warnings:

  - You are about to drop the column `puoplar` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "puoplar",
ADD COLUMN     "popular" BOOLEAN;
