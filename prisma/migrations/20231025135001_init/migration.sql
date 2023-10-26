/*
  Warnings:

  - The primary key for the `coffee_flavors_flavor` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "coffee_flavors_flavor" DROP CONSTRAINT "coffee_flavors_flavor_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "coffee_flavors_flavor_pkey" PRIMARY KEY ("id");
