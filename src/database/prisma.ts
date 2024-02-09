import { PrismaClient } from "@prisma/client";


export const prisma = new PrismaClient({
    log: ['query'] // show the logging of prisma
})