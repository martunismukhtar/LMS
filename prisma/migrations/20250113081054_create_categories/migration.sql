-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP(6),

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);
