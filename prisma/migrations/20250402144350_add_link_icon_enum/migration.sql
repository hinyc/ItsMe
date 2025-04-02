/*
  Warnings:

  - Added the required column `icon` to the `UserLink` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LinkIcon" AS ENUM ('instagram', 'facebook', 'x', 'linkedin', 'github', 'blog', 'wechat', 'tiktok', 'thread');

-- AlterTable
ALTER TABLE "UserLink" ADD COLUMN     "icon" "LinkIcon" NOT NULL;
