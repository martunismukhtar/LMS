import { DefaultSession, DefaultUser } from "next-auth";

type Role = {
    id: number;
    name: string;
}

type Permissions = {
    id: number;
    name: string;
}

declare module "next-auth" {
    interface Session extends DefaultSession {
        permissions?: Permissions[]; // Tambahkan properti permissions
        role?: Role;
    }

    interface User extends DefaultUser {
        permissions?: Permissions[]; // Jika juga digunakan di JWT atau user object
        role?: Role;
    }
}
