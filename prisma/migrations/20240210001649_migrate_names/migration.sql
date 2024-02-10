/*
  Warnings:

  - You are about to drop the column `session_id` on the `Vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId,pollsId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Vote_session_id_pollsId_key";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "session_id",
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_sessionId_pollsId_key" ON "Vote"("sessionId", "pollsId");
