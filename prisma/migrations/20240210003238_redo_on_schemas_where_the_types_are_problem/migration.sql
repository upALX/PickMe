/*
  Warnings:

  - The primary key for the `PollOptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `option_key` on the `PollOptions` table. All the data in the column will be lost.
  - The primary key for the `Polls` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `poll_key` on the `Polls` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PollOptions" DROP CONSTRAINT "PollOptions_pollsId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pollOptionsId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pollsId_fkey";

-- AlterTable
ALTER TABLE "PollOptions" DROP CONSTRAINT "PollOptions_pkey",
DROP COLUMN "option_key",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "pollsId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PollOptions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PollOptions_id_seq";

-- AlterTable
ALTER TABLE "Polls" DROP CONSTRAINT "Polls_pkey",
DROP COLUMN "poll_key",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Polls_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Polls_id_seq";

-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "pollsId" SET DATA TYPE TEXT,
ALTER COLUMN "pollOptionsId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "PollOptions" ADD CONSTRAINT "PollOptions_pollsId_fkey" FOREIGN KEY ("pollsId") REFERENCES "Polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pollOptionsId_fkey" FOREIGN KEY ("pollOptionsId") REFERENCES "PollOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_pollsId_fkey" FOREIGN KEY ("pollsId") REFERENCES "Polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
