-- CreateEnum
CREATE TYPE "user" AS ENUM ('Siswa', 'Alumni', 'Admin');

-- CreateEnum
CREATE TYPE "jeniskelamin" AS ENUM ('LakiLaki', 'Perempuan');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jeniskelamin" "jeniskelamin" NOT NULL,
    "user" "user" NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "tempat" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "hashtag" TEXT[],
    "deskripsisingkat" TEXT NOT NULL,
    "deskripsipanjang" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "waktu" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "genre" TEXT NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_email_key" ON "Posts"("email");
