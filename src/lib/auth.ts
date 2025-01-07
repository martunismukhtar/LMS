import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type roleType = {
    id: number;
    name: string;
}
type permissionsType = {
    id: number;
    name: string;
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({            
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {                 
                const res = await axios.post(`${process.env.VITE_API}auth`, {
                    email: credentials?.email,
                    password: credentials?.password
                })
                .then(res=>res.data)
                .catch(err=>err.message);
                
                console.log(res)        
                const user = {
                    id: res.user.id,
                    name: res.user.username,
                    email: res.user.email,
                    role: res.user.role,
                    permissions: res.user.permissions,
                    token: res.token, // Pastikan token disertakan
                };
                console.log(user)
                return user;
                             
            },
        }),
    ],
    pages: {
        signIn: "/login",  
    },
    callbacks: {
        jwt({ token, user }) {
          if (!user) return token
            token.role = user.role;
            token.permissions = user.permissions;
          return {
            ...token,
            id: user.id,
          }
        },
        session({ session, token }) {
            session.role = token.role as roleType;
            session.permissions = token.permissions as permissionsType[];
          return {
            ...session,
            id: token.id,
          }
        },
      },
};