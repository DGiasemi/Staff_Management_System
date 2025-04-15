'use client';
import "./globals.css";
import { useEffect } from "react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const { worker } = require('@/mocks/browser');
      worker?.start();
    }
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
