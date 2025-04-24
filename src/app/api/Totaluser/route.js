import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from '../../../../models/user';

export async function GET(){
    await connectMongoDB();
    const totalusers = await User.find();
    return NextResponse.json({totalusers});
}

export async function DELETE(req){
    const id =req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await  User.findByIdAndDelete(id);
    return NextResponse.json({message: "delete"},{status:200})
}