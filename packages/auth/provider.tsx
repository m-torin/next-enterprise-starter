'use client';

import { SessionProvider } from 'next-auth/react';
import type { ComponentProps } from 'react';

export function AuthProvider({
  children,
  ...props
}: ComponentProps<typeof SessionProvider>) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
