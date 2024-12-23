// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
import { tailwind } from '@repo/tailwind-config';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Configure providers in separate auth.providers.ts
  theme: {
    systemTheme: {
      fontFamily: tailwind.theme.fontFamily.sans.join(', '),
      buttonFontFamily: tailwind.theme.fontFamily.sans.join(', '),
      fontSize: tailwind.theme.fontSize.sm[0],
      fontWeight: {
        bold: tailwind.theme.fontWeight.bold,
        normal: tailwind.theme.fontWeight.normal,
        medium: tailwind.theme.fontWeight.medium,
      },
      spacing: tailwind.theme.spacing[4],
    },
  },
} satisfies NextAuthConfig;
