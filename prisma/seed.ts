import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();
async function main() {
    await prisma.user.create({
        data: {
            name: 'Martunis',
            email: 'admin@geo.com',
            password: await bcrypt.hash('rahasia', 10),
        },
    });

    await prisma.roles.create({
        data: { 
            name: 'admin',
            description: 'Admin role'
        },
    });

    await prisma.roles.create({
        data: { 
            name: 'user',
            description: 'User role'
        },
    });

    const user = await prisma.user.findFirst({ where: { email: 'admin@geo.com' } });
    const role = await prisma.roles.findFirst({ where: { name: 'admin' } });
    if (user && role) {
        await prisma.userRole.create({
            data: { 
                id: uuidv4(),
                user_id: user.id,
                role_id: role.id
            },
        });
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {   
    console.error(e); 
    await prisma.$disconnect();
    process.exit(1);
});