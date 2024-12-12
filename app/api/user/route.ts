"use server";

import { prisma } from "@/app/lib/prisma";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { join } from "path";
import mime from "mime";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const name = (formData.get("name") as any) || null;
    const gender = (formData.get("gender") as any) || null;
    const age = (formData.get("age") as any) || null;
    const zodiacSign = (formData.get("zodiacSign") as any) || null;
    const email = (formData.get("email") as any) || null;

    let imgs = parseInt((formData.get("fileArrayLenght")) as any) || 0;
    
    if(imgs > 0) {
      for (let init = 0; init < imgs; init++) {
        const image0 = (formData.get(`file${init}`) as File) || null;
      }
    }

    const image0 = (formData.get("file0") as File) || null;
    const image1 = (formData.get("file1") as File) || null;

    const buffer0: any = Buffer.from(await image0.arrayBuffer());
    const buffer1: any = Buffer.from(await image1.arrayBuffer());

    const relativeUploadDir = `/uploads/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;

    const uploadDir0 = join(process.cwd(), "public", relativeUploadDir);
    const uploadDir1 = join(process.cwd(), "public", relativeUploadDir);

    try {
      await stat(uploadDir0);
      await stat(uploadDir1);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir0, { recursive: true });
        await mkdir(uploadDir1, { recursive: true });
      } else {
        console.error( "Error while trying to create directory when uploading a file\n", e
        );
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 }
        );
      }
    }

    try {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename0 = `${image0.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(image0.type)}`;
      const filename1 = `${image1.name.replace(
        /\.[^/.]+$/,
        ""
      )}-${uniqueSuffix}.${mime.getExtension(image1.type)}`;
      
      await writeFile(`${uploadDir0}/${filename0}`, buffer0);
      await writeFile(`${uploadDir1}/${filename1}`, buffer1);
      
      const fileUrl0 = `${relativeUploadDir}/${filename0}`;
      const fileUrl1 = `${relativeUploadDir}/${filename1}`;

      const userCreated = await prisma.users.create({
        data: {
          name: name,
          gender: gender,
          age: parseInt(age),
          zodiacSign: zodiacSign,
          email: email,
          images: {
            create: [
              {
                image: fileUrl0
              },
              {
                image: fileUrl1
              }
            ]
          }
        },
      });

      const listUsers = await prisma.users.findMany();
      const UsersLenght = await prisma.users.count({});

      return NextResponse.json(
        {
          message: `Se asigno el id ${userCreated.id} y se agrego el usuario: ${userCreated.name} exitosamente`,
          res: {
            userCreated: userCreated,
            listOfUsers: listUsers,
            length: UsersLenght,
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

  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const listUsers = await prisma.users.findMany();
    const UsersLenght = await prisma.users.count({});

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
