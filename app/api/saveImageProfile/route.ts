"use server";

import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Encontre la API");

  try {
    const body = await req.json();
    const { name, gender, zodiacSign, email } = body;

    const userCreated = await prisma.user.create({
      data: {
        name: name,
        gender: gender,
        zodiacSign: zodiacSign,
        email: email,
        image: ''
      },
    });
    const listUsers = await prisma.user.findMany();

    const UsersLenght = await prisma.user.count();

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
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
