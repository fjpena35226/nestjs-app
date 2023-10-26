/*
  Warnings:

  - You are about to drop the `coffee_flavors_flavor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "coffee_flavors_flavor" DROP CONSTRAINT "coffee_flavors_flavor_coffeeId_fkey";

-- DropForeignKey
ALTER TABLE "coffee_flavors_flavor" DROP CONSTRAINT "coffee_flavors_flavor_flavorId_fkey";

-- DropTable
DROP TABLE "coffee_flavors_flavor";

-- CreateTable
CREATE TABLE "_CoffeeToFlavor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoffeeToFlavor_AB_unique" ON "_CoffeeToFlavor"("A", "B");

-- CreateIndex
CREATE INDEX "_CoffeeToFlavor_B_index" ON "_CoffeeToFlavor"("B");

-- AddForeignKey
ALTER TABLE "_CoffeeToFlavor" ADD CONSTRAINT "_CoffeeToFlavor_A_fkey" FOREIGN KEY ("A") REFERENCES "coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeToFlavor" ADD CONSTRAINT "_CoffeeToFlavor_B_fkey" FOREIGN KEY ("B") REFERENCES "flavor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
