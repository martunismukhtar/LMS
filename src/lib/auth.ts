
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60
    },
    providers: [
        Credentials({            
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {                 
                // const { email, password } = credentials || {};
                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials?.email,
                    },
                }).then(res=>res)
                .catch(err=>err.message);
            
                if(!user) {
                    throw new Error("User not found")
                }
                const isValidPassword = await bcrypt.compare(
                    credentials?.password || '',
                    user.password
                );
                if (!isValidPassword) {
                    throw new Error('Invalid email or password');
                }
                
                const user_role = await prisma.userRole.findFirst({
                    where: {
                        user_id: user.id,
                    },
                })
                let roles;
                if(user_role) {
                    roles = await prisma.roles.findUnique({
                        select: {
                          id: true,
                          name: true 
                        },
                        where: {
                            id: user_role?.role_id,
                        },
                    })
                } else {
                    roles = {
                        name: 'user'
                    }
                }
               
                const userAuth = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: roles?.name,
                    // accessToken: token,
                    // refreshToken: refreshToken
                }
                return userAuth;
                // const res = await axios.post(`${process.env.VITE_API}auth`, {
                //     email: credentials?.email,
                //     password: credentials?.password
                // })
                // .then(res=>res.data)
                // .catch(err=>err.message);
                  
                // const user = {
                //     id: res.user.id,
                //     name: res.user.username,
                //     email: res.user.email,
                //     role: res.user.role,
                //     permissions: res.user.permissions,
                //     accessToken: res.accessToken, // Pastikan token disertakan
                // };                
                // return user;
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
            token.id = user.id;
          return {
            ...token,
            id: user.id,
          }
        },
        session({ session, token }) {
            session.role = token.role as string;
            session.id = token.userId as string;
          return {
            ...session,
            id: token.id,
          }
        },
      },
};