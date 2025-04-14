"use client";
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import Header from '@/components/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Check both Zustand state and localStorage
    const storedAuth = localStorage.getItem('auth-storage');
    if (!user && !storedAuth) {
      redirect('/');
    }
    setIsCheckingAuth(false);
  }, [user]);

  if (isCheckingAuth) {
    return <div>Loading...</div>; // Or a nice spinner
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}