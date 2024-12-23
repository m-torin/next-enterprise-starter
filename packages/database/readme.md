# Prisma ORM

Usage:

```ts
// In a Node.js context
import { prisma } from '@repo/database';

// In an Edge context
import { prismaEdge } from '@repo/database/edge';

// Or if you need dynamic selection
import { getClient } from '@repo/database/client';
const client = getClient('edge'); // or 'node'
```
