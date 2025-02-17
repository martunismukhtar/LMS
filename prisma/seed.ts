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

    await prisma.categories.create({
        data: { 
            name: 'Programming',
            description: 'Programming'
        },
    });
    await prisma.categories.create({
        data: { 
            name: 'Business',
            description: 'Business'
        },
    });

    const categories = await prisma.categories.findMany({
        where: {
            name: 'Programming'
        }
    });
    const categories_business = await prisma.categories.findMany({
        where: {
            name: 'Business'
        }
    });

    await prisma.courses.create({
        data: { 
            title: 'Belajar Javascript',
            description: 'Belajar Javascript',
            price: 10,
            status: 'draft',
            duration:2,
            slug: 'belajar-javascript',            
            category_id: categories[0].id
        },
    });
    await prisma.courses.create({
        data: { 
            title: 'Belajar Python',
            description: 'Belajar Python',
            price: 10,
            status: 'draft',
            duration:2,
            slug: 'belajar-python',
            category_id: categories[0].id
        },
    });
    await prisma.courses.create({
        data: { 
            title: 'Kelas Python Lengkap 2025: Pemula Sampai Mahir (+Projects)',
            description: 'Menguasai Bahasa Python, Mulai dari Basic Hingga Advanced, disertai Module Python, Project, Git, Github, dan Leetcode.',
            price: 10,
            status: 'draft',
            duration:2,
            slug: 'kursus-python-lengkap-berbahasa-indonesia-basic-advanced',
            category_id: categories[0].id
        },
    });
    await prisma.courses.create({
        data: { 
            title: 'React.js : Pemula sampai Mahir',
            description: 'Belajar ReactJS dari pemula sampai mahir',
            price: 10,
            status: 'draft',
            duration:2,
            slug: 'belajar-reactjs',
            category_id: categories[0].id
        },
    });
    await prisma.courses.create({
        data: { 
            title: 'Bootcamp Data Analyst Python 2025 (+ Portfolio Projects)',
            description: 'Bahasa Python Untuk Analisis Data dan Visualisasi Data, Disertai Kuis, Latihan, Project.',
            price: 10,
            status: 'draft',
            duration:2,
            slug: 'kelas-analisis-data-dan-visualisasi-data-python-terbaru',
            category_id: categories[0].id
        },
    });
    //categories_business
    await prisma.courses.create({
        data: { 
            title: 'Digital Marketing Untuk Pemula - 15 Courses in 1',
            description: 'Digital marketing funnel, website, copywriting, UI/UX, SEO, Google Search Ads, email marketing, Facebook, Instagram',
            price: 10,
            status: 'draft',
            duration:2,
            slug: 'belajar-digital-marketing-lengkap-untuk-pemula-established',
            category_id: categories_business[0].id
        },
    });
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {   
    console.error(e); 
    await prisma.$disconnect();
    process.exit(1);
});