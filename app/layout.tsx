import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { SecurityProvider } from '@/components/SecurityProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'INMS - Ilocos Norte Medical Society',
  description: 'Connect, collaborate, and advance healthcare together',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SecurityProvider>
            {children}
          </SecurityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}