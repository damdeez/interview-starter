import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import Header from '@/app/components/Header/Header';
import '@/app/globals.css';
import { Toaster } from '@/registry/new-york-v4/ui/sonner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'by Foodelity',
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
    // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
    <html suppressHydrationWarning lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}>
        <ThemeProvider defaultTheme='light' attribute='class'>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
