import { NextRequest, NextResponse } from "next/server";
import User from "@/models/Users";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    if (!email || !password) {
    return NextResponse.json(
      {
        error: "Email and password is required",
      },
      {
        status: 400,
      }
    );
  }
    await dbConnect();
    let existingUser = await User.findOne({email})
    if(existingUser){
        return NextResponse.json({
            error: "User already exist"
        }, {
            status: 400
        });
    }

     await User.create({
        email,
        password
    })

    return NextResponse.json({
        message: "User registered Succesfully"
    }, {
        status: 200
    })

  } catch (error) {
        NextResponse.json({
            error: "Something went wrong"
        }, {
            status: 500
        })
  }
  
  

}
