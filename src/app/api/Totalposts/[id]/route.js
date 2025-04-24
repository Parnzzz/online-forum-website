import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req,context){
  const {id} = context.params
  await connectMongoDB();
  const post = Post.findOne({_id: id})
  return NextResponse.json({post})
}

export async function PUT(req,context){
    const {id} =context.params
    const{newTitle:title, newImg:img, newContent:content} = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id,{title,img,content});
    return NextResponse.json({message:"update complete"},{status:200})

}