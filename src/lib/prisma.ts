import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// 에러 발생 시 자동 재연결 시도
prisma.$on('error' as never, async (e) => {
  console.error('Prisma Error:', e);
  await prisma.$disconnect();
  await prisma.$connect();
});

export { prisma };
