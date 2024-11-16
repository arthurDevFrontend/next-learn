import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const body = await req.json()
      const {skipR, takeR} = body
      
      const listUsers = await prisma.users.findMany({
        skip: skipR,
        take: takeR,
      })
      const UsersLenght = await prisma.users.count({});
  
      return NextResponse.json(
        { 
          message: `Se listan datos`,
          res: {
            listOfUsers: listUsers,
            lenght: UsersLenght
          }
        },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  }
  