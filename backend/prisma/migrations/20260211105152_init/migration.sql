-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "developer" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "puoplar" BOOLEAN,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
