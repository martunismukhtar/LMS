import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        role?: string;
        accessToken?: string
        refreshToken?: string
    }

    interface User extends DefaultUser {        
        role?: string;
        accessToken?: string
        refreshToken?: string
    }
}
