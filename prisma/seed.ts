import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
    await prisma.user.create({
        data: {
            name: 'Martunis',
            email: 'admin@geo.com',
            password: await bcrypt.hash('rahasia', 10),
        },
    });
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {    
    await prisma.$disconnect();
    process.exit(1);
});