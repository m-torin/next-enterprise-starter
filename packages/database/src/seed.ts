// seed.ts
import type { User } from '@prisma/client';

import { getClient } from '#/client';

// Add your own user to pre-populate the database with
const DEFAULT_USERS: Array<Partial<User>> = [
  {
    firstName: 'Tim',
    lastName: 'Apple',
    name: 'Tim Apple',
    email: 'tim@apple.com',
  },
];

/**
 * Seeds the database with default users.
 */
(async (): Promise<void> => {
  const prisma = getClient('node'); // Using the 'node' Prisma client

  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            firstName: user.firstName!,
            lastName: user.lastName!,
            name: user.name,
            email: user.email,
          },
          create: {
            firstName: user.firstName!,
            lastName: user.lastName!,
            name: user.name!,
            email: user.email!,
          },
        }),
      ),
    );

    console.log('Default users have been seeded successfully.');
  } catch (error) {
    console.error('Error seeding default users:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
