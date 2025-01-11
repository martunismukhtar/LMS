-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('draft', 'publish');

-- CreateTable
CREATE TABLE "courses" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "CourseStatus" NOT NULL DEFAULT 'draft',
    "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "duration" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);
