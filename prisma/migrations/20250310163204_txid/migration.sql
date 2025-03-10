/*
  Warnings:

  - Added the required column `txid` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "txid" TEXT NOT NULL;
