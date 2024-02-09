/*
  Warnings:

  - You are about to drop the `Poll` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Poll";

-- CreateTable
CREATE TABLE "Polls" (
    "id" TEXT NOT NULL,
    "poll_key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Polls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollOptions" (
    "id" TEXT NOT NULL,
    "option_key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pollsId" TEXT NOT NULL,

    CONSTRAINT "PollOptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PollOptions" ADD CONSTRAINT "PollOptions_pollsId_fkey" FOREIGN KEY ("pollsId") REFERENCES "Polls"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
