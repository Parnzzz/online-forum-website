import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Post from '../../../../models/post';

export async function GET(){
    await connectMongoDB();
    const totalposts = await Post.find().sort({ createdAt: -1});
    return NextResponse.json({totalposts});
}

export async function DELETE(req){
    const id =req.nextUrl.searchParams.get("id");
    console.log(id)
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({Message: "delete complete"},{status:200})
}