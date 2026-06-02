
import type {Metadata} from 'next';
import './globals.css';
import { BottomNav } from '@/components/bottom-nav';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'GeoSocial | Connect Nearby',
  description: 'Real-time location based social network',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        <main className="pb-16 md:pb-0">
          {children}
        </main>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
