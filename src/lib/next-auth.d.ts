import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        role?: string;
        id?: string
    }

    interface User extends DefaultUser {        
        role?: string;
        id?: string
    }
}
