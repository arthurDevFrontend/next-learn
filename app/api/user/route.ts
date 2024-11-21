"use server";

import { prisma } from "@/app/lib/prisma";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { join } from "path";
import mime from "mime";

export async function POST(req: NextRequest) {
  try {
    //const body = await req.json();

    const formData = await req.formData();
    const image = (formData.get("file") as File) || null;
    const name = (formData.get("name") as any) || null;
    const gender = (formData.get("gender") as any) || null;
    const zodiacSign = (formData.get("zodiacSign") as any) || null;
    const email = (formData.get("email") as any) || null;

    console.log(name, gender, zodiacSign, email);

    const buffer: any = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/uploads/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        // This is for checking the directory is exist (ENOENT : Error No Entry)
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(
          "Error while trying to create directory when uploading a file\n",
          e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${image.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
      await writeFile(`${uploadDir}/${filename}`, buffer);
      const fileUrl = `${relativeUploadDir}/${filename}`;

      // Save to database
      const userCreated = await prisma.user.create({
        data: {
          name: name,
          gender: gender,
          zodiacSign: zodiacSign,
          email: email,
          image: fileUrl
        },
      });

      const listUsers = await prisma.user.findMany();

      const UsersLenght = await prisma.user.count({});

      return NextResponse.json(
        {
          message: `Se asigno el id ${userCreated.id} y se agrego el usuario: ${userCreated.name} exitosamente`,
          res: {
            userCreated: userCreated,
            listOfUsers: listUsers,
            lenght: UsersLenght,
          },
        },
        { status: 200 }
      );
    } catch (e) {
      console.error("Error while trying to upload a file\n", e);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: `Ya tengo la info del la imagen`,
        res: {
          imagen: "Aca anda",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  console.log("Encontre la API GET");

  try {
    const listUsers = await prisma.user.findMany();
    const UsersLenght = await prisma.user.count({});

    return NextResponse.json(
      {
        message: `Se encontraron ${UsersLenght} usuarios.`,
        res: {
          listOfUsers: listUsers,
          lenght: UsersLenght,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
