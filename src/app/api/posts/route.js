import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req){     //send content to api
    const {title,img,content,userEmail} = await req.json();
    await connectMongoDB();
    await Post.create({title,img,content,userEmail});
    return NextResponse.json({message:"Post created"},{status:201})
}

export async function GET(req){   //receive data from api
    const userEmail = req.nextUrl.searchParams.get("email")//get by email match with db
    await connectMongoDB();
    const posts = await Post.find({userEmail: userEmail})
    return NextResponse.json ({posts});
}

