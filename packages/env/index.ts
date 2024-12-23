import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Environment configuration for a Next.js application using Next-Auth v5
 * Includes validation patterns for various environment variables
 * and separates client-side and server-side configurations
 */

// Common validation patterns
const patterns = {
  secretKey: (prefix: string) => z.string().min(1).startsWith(prefix),
  webhookSecret: () => z.string().min(1).startsWith('whsec_').optional(),
  url: () => z.string().min(1).url(),
  optional: {
    url: () => z.string().min(1).url().optional(),
    string: () => z.string().min(1).optional(),
  },
} as const;

// Server-side environment schema
const server = {
  // Auth & Security
  AUTH_SECRET: z.string().min(32), // Next-Auth v5 secret
  AUTH_URL: patterns.url(), // Next-Auth v5 URL
  AUTH_GITHUB_ID: z.string().min(1),
  AUTH_GITHUB_SECRET: z.string().min(1),
  AUTH_GOOGLE_ID: z.string().min(1).optional(),
  AUTH_GOOGLE_SECRET: z.string().min(1).optional(),
  ARCJET_KEY: patterns.secretKey('ajkey_').optional(),
  FLAGS_SECRET: patterns.optional.string(),

  // API Keys
  RESEND_TOKEN: patterns.secretKey('re_'),
  BASEHUB_TOKEN: patterns.secretKey('bshb_pk_'),
  BETTERSTACK_API_KEY: patterns.optional.string(),
  OPENAI_API_KEY: patterns.secretKey('sk-').optional(),

  // Service URLs & Connections
  DATABASE_URL: patterns.url(),
  RESEND_FROM: z.string().min(1).email(),
  BETTERSTACK_URL: patterns.optional.url(),
  UPSTASH_REDIS_REST_URL: patterns.optional.url(),
  UPSTASH_REDIS_REST_TOKEN: patterns.optional.string(),

  // Integration Tokens
  // Strapi related

  // Monitoring & Analytics
  SENTRY_ORG: patterns.optional.string(),
  SENTRY_PROJECT: patterns.optional.string(),
  ANALYZE: patterns.optional.string(),

  // Platform Config
  VERCEL: patterns.optional.string(),
  NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
  BLOB_READ_WRITE_TOKEN: patterns.optional.string(),
} as const;

// Client-side environment schema
const client = {
  // Application URLs
  NEXT_PUBLIC_APP_URL: patterns.url(),
  NEXT_PUBLIC_WEB_URL: patterns.url(),
  NEXT_PUBLIC_API_URL: patterns.optional.url(),
  NEXT_PUBLIC_DOCS_URL: patterns.optional.url(),

  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().min(1).startsWith('G-').optional(),
  NEXT_PUBLIC_POSTHOG_KEY: patterns.secretKey('phc_'),
  NEXT_PUBLIC_POSTHOG_HOST: patterns.url(),

  // Platform Config
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: z.string().min(1),
} as const;

// Create and export the environment configuration
export const env = createEnv({
  client,
  server,
  runtimeEnv: {
    ...Object.entries(server).reduce(
      (acc, [key]) => {
        acc[key as keyof typeof server] = process.env[key];
        return acc;
      },
      {} as Record<keyof typeof server, string | undefined>,
    ),
    ...Object.entries(client).reduce(
      (acc, [key]) => {
        acc[key as keyof typeof client] = process.env[key];
        return acc;
      },
      {} as Record<keyof typeof client, string | undefined>,
    ),
  },
});
