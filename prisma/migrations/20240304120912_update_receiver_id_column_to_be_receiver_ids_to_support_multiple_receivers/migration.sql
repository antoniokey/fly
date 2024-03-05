/*
  Warnings:

  - You are about to drop the column `receiver_id` on the `messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "receiver_id",
ADD COLUMN     "receiver_ids" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
