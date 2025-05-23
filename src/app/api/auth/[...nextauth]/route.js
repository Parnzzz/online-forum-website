import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {email: { label: "Email", type: "text" },
  password: { label: "Password", type: "password" },},
          async authorize(credentials) {
           console.log("Credentials received:", credentials)
 
            const { email, password } = credentials;

            try {

                await connectMongoDB();
                const user = await User.findOne({ email });

                if (!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return null;
                }

                return {
                  id: user._id.toString(),
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  };

            } catch(error) {
                console.log("Error: ", error);
                 return null;
            }
            
          }
        })
      ],
      session: {
        strategy: "jwt"
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: "/Login"
      },
      callbacks: {
        async jwt({ token, user, session }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role
                }
            }

            return token;
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            }
        }
      }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };