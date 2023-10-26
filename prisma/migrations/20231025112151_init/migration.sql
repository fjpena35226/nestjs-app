-- CreateTable
CREATE TABLE "coffee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,

    CONSTRAINT "coffee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flavor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "flavor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coffee_flavors_flavor" (
    "coffeeId" INTEGER NOT NULL,
    "flavorId" INTEGER NOT NULL,

    CONSTRAINT "coffee_flavors_flavor_pkey" PRIMARY KEY ("coffeeId","flavorId")
);

-- CreateIndex
CREATE INDEX "IDX_coffeID938234sdfs" ON "coffee_flavors_flavor"("coffeeId");

-- CreateIndex
CREATE INDEX "IDX_flavorId2304sdjfs" ON "coffee_flavors_flavor"("flavorId");

-- AddForeignKey
ALTER TABLE "coffee_flavors_flavor" ADD CONSTRAINT "coffee_flavors_flavor_coffeeId_fkey" FOREIGN KEY ("coffeeId") REFERENCES "coffee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coffee_flavors_flavor" ADD CONSTRAINT "coffee_flavors_flavor_flavorId_fkey" FOREIGN KEY ("flavorId") REFERENCES "flavor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
