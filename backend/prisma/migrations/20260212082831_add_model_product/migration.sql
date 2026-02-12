-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "bonus" INTEGER,
    "price" INTEGER NOT NULL,
    "label" TEXT,
    "gameId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
