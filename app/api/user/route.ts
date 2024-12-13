import { prisma } from "@/app/lib/prisma";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import path, { join } from "path";
import mime from "mime";
import { v4 as uuidv4 } from 'uuid';


export async function POST(req: NextRequest, res: NextResponse) {

  const data = await req.formData()

  const name = data.get('nombre') as string
  const age = parseInt(data.get('edad') as string)
  const gender = data.get('genero') as string
  const zodiacSign = data.get('signo') as string
  const email = data.get('correo') as string
  const images = data.getAll('imagenes') as File[]

  console.log('Recibi estas imagenes', images);

  const imagenesGuardadas = []

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const relativeUploadDir = `/uploads/${new Date(Date.now())
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")}`;
  try {
    for (const imagen of images) {


      const bytes = await imagen.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const nombreArchivo = `${Date.now()}-${uniqueSuffix}-${uuidv4()}.${imagen.name.split('.')[1]}`
      const rutaArchivo = join(process.cwd(), "public", relativeUploadDir);
      
      try {
        await stat(rutaArchivo);
      } catch (e: any) {
        if (e.code === "ENOENT") {
          await mkdir(rutaArchivo, { recursive: true });
        } else {
          console.error( "Error while trying to create directory when uploading a file\n", e
          );
          return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
          );
        }
      }

      await writeFile(`${rutaArchivo}/${nombreArchivo}`, buffer as any);
      imagenesGuardadas.push(`${rutaArchivo}/${nombreArchivo}`)
    }
/*  
    const dataToPrisma = {
      data: {
        name: name,
        gender: gender,
        age: age,
        zodiacSign: zodiacSign,
        email: email
      }
    };

    const userCreated = await prisma.users.create(
      dataToPrisma
    );

    console.log(userCreated);  */
    
    return NextResponse
    .json({
      success: true,
      imagenesGuardadas
     })
  } catch (error) {
    console.error('Error al procesar la solicitud:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Error al guardar los datos'
      },
      { status: 500 }
    )
  }
  
 /*  
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
     */
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
