// client.ts
import { PrismaClient } from '@prisma/client';
import { PrismaClient as EdgePrismaClient } from '@prisma/client/edge';

declare global {
  var prisma: PrismaClient | undefined;
  var prismaEdge: EdgePrismaClient | undefined;
}

type PrismaClientType = PrismaClient | EdgePrismaClient;

export const getClient = (type: 'edge' | 'node' = 'node'): PrismaClientType => {
  if (type === 'edge') {
    return (
      globalThis.prismaEdge ?? (globalThis.prismaEdge = new EdgePrismaClient())
    );
  }

  if (process.env.NODE_ENV === 'production') {
    return new PrismaClient();
  }

  return globalThis.prisma ?? (globalThis.prisma = new PrismaClient());
};
