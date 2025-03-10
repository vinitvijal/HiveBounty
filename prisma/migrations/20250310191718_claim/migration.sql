-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "claimedAt" TIMESTAMP(3),
ADD COLUMN     "claimedBy" TEXT,
ADD COLUMN     "claimedStatus" TEXT DEFAULT 'pending',
ADD COLUMN     "claimedTxid" TEXT;
