import {NextResponse} from 'next/server'
import {connectMongoDB} from"../../../../lib/mongodb"
import bcrypt from 'bcryptjs';
import User from '../../../../models/user';

export async function POST(req){
    try{
        const{name ,email ,password}=await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        await connectMongoDB();
        await User.create({name, email, password: hashedPassword});
        
        
        
        
        
        //console.log("Name",name);
        //console.log("Email",email);
        //console.log("Password",password);

        return NextResponse.json({ message: "user registered."},{status:201})
    }catch(error){
        console.log("ERROR IS ",error)
        return NextResponse.json({message:"An error occured whiLe register the user."},{status:500});
    }
}