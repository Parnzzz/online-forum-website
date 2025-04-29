import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";


const authOptions = {
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'credentials',
          
          credentials: {},
          async authorize(credentials, req) {
           const {email,password} =credentials
          // const user = {id: '1'}
          //return user;
          try{
          await connectMongoDB();
          const user = await User.findOne({email});
          if(!user){
            return null;
          }
           const passwordmatch = await bcrypt.compare(password, user.password);  //compare password
           if(!passwordmatch){
             return null;
           }
           return user;
           
          }catch(error){
            console.log(error);
               return null;
          }
          }
        })
      ],
      session:{
        strategy: "jwt"
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages:{
        signIn: "/Login"
      },
      callbacks:{   //ส่งค่าเพิ่มเติม
        async jwt({token,user,session}){
          if(user){
            return{
              ...token,
              id: user.id,
              role:user.role
            }
          }
          return token;
        },
        async session({session,user,token}){
          return{
            ...session,
            user:{
              ...session.user,
              id: token.id,
              role:token.role
            }
          }
        }
      }
}
const handler =NextAuth(authOptions);
export { handler as GET , handler as POST};
