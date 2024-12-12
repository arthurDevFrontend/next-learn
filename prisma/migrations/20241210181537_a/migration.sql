/*
  Warnings:

  - Added the required column `age` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "zodiacSign" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Users" ("email", "gender", "id", "name", "zodiacSign") SELECT "email", "gender", "id", "name", "zodiacSign" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
