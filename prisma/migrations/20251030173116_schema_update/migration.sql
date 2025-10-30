/*
  Warnings:

  - You are about to drop the `ChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ChatRoomToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'NOT_AVAILABLE');

-- DropForeignKey
ALTER TABLE "public"."Messages" DROP CONSTRAINT "Messages_roomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ChatRoomToUser" DROP CONSTRAINT "_ChatRoomToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ChatRoomToUser" DROP CONSTRAINT "_ChatRoomToUser_B_fkey";

-- AlterTable
ALTER TABLE "Messages" ADD COLUMN     "groupChatRoomId" TEXT,
ADD COLUMN     "singleChatRoomId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "jobRole" TEXT,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'AVAILABLE';

-- DropTable
DROP TABLE "public"."ChatRoom";

-- DropTable
DROP TABLE "public"."_ChatRoomToUser";

-- CreateTable
CREATE TABLE "SingleChatRoom" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receverId" TEXT NOT NULL,
    "blocked" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SingleChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupChatRoom" (
    "id" TEXT NOT NULL,
    "roomName" TEXT NOT NULL,
    "roomAdminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroupChatRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupParticipants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GroupParticipants_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SingleChatRoom_senderId_receverId_key" ON "SingleChatRoom"("senderId", "receverId");

-- CreateIndex
CREATE INDEX "_GroupParticipants_B_index" ON "_GroupParticipants"("B");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_singleChatRoomId_fkey" FOREIGN KEY ("singleChatRoomId") REFERENCES "SingleChatRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_groupChatRoomId_fkey" FOREIGN KEY ("groupChatRoomId") REFERENCES "GroupChatRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SingleChatRoom" ADD CONSTRAINT "SingleChatRoom_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SingleChatRoom" ADD CONSTRAINT "SingleChatRoom_receverId_fkey" FOREIGN KEY ("receverId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupChatRoom" ADD CONSTRAINT "GroupChatRoom_roomAdminId_fkey" FOREIGN KEY ("roomAdminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupParticipants" ADD CONSTRAINT "_GroupParticipants_A_fkey" FOREIGN KEY ("A") REFERENCES "GroupChatRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupParticipants" ADD CONSTRAINT "_GroupParticipants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
