-- AlterTable User: add optional columns
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "resetPasswordToken" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "resetPasswordExpires" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "address" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "age" INTEGER;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "gender" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "image" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "job" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "name" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" TEXT;

-- AlterTable Hotel: add optional columns
ALTER TABLE "Hotel" ADD COLUMN IF NOT EXISTS "closingTime" TEXT;
ALTER TABLE "Hotel" ADD COLUMN IF NOT EXISTS "image" TEXT;
ALTER TABLE "Hotel" ADD COLUMN IF NOT EXISTS "isClosed" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Hotel" ADD COLUMN IF NOT EXISTS "openingTime" TEXT;

-- AlterTable Product: add optional image
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "image" TEXT;

-- AlterTable Reservation: customerPhone nullable, add userId
ALTER TABLE "Reservation" ALTER COLUMN "customerPhone" DROP NOT NULL;
ALTER TABLE "Reservation" ADD COLUMN IF NOT EXISTS "userId" TEXT;

-- CreateTable Announcement
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey Announcement -> Hotel
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey Reservation.userId -> User (if not exists; Prisma may have created it)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Reservation_userId_fkey'
  ) THEN
    ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;
