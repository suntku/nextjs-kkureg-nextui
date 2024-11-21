import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// ปิดการเชื่อมต่อเมื่อโปรเซสถูกปิด
process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
});
