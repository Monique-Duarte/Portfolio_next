'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
  [key: string]: unknown;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}