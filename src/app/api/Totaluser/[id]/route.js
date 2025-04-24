import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req,context){     //get data before edit
    const{id} = context.params;            //get id from url
    await connectMongoDB();
    const user = await User.findOne({_id: id});    //find id in db
    return NextResponse.json({user},{status:200})
}

export async function PUT(req,context){
    const {id} = context.params;
    const{newName:name,newEmail:email,newPassword: password} = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10)
    await connectMongoDB();
    await User.findByIdAndUpdate(id,{name,email,password: hashedPassword})
    return NextResponse.json({message:"user updated"},{status:200})
}