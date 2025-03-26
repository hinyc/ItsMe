/*
  Warnings:

  - You are about to drop the column `linkType` on the `UserLink` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "comment" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "UserLink" DROP COLUMN "linkType";

-- DropEnum
DROP TYPE "LinkType";
