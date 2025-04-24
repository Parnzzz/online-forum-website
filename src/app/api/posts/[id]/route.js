import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req,context){    //recieve POST from db by id in url
    const { id } = context.params;    //recieve id from params 
    await connectMongoDB();
    const post = await Post.findOne ({_id: id})     //find id in db match with URLparams
    return NextResponse.json({post},{status:200})
}

export async function PUT(req,context){     //update post in db
    const {id} = context.params;
    const{newTitle: title ,newImg: img, newContent :content} = await req.json()   //get parameter from json
    await connectMongoDB();
    await Post.findByIdAndUpdate(id,{title,img,content})
    return NextResponse.json({message:"post updated"},{status:200})
}
export async function DELETE(req){
    const id =req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return  NextResponse.json({message:"Delete complete"},{status: 200})
}