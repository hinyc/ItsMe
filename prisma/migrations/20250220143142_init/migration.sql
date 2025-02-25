/*
  Warnings:

  - A unique constraint covering the columns `[personalUrl]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_personalUrl_key" ON "User"("personalUrl");
