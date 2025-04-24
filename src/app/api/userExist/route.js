import {NextResponse} from 'next/server'
import {connectMongoDB} from"../../../../lib/mongodb"

import User from '../../../../models/user';

export async function POST(req){
    try{
        await connectMongoDB();
        const{email, name} = await req.json();
        const user = await User.findOne({ email }).select("_id")  //check
        const username = await User.findOne({ name }).select("_id")  //check
        console.log("User:",user)

        return NextResponse.json({user,username})


    }catch(error){
        console.log(error)
    }
}