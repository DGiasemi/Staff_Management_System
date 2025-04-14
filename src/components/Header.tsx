"use client";
import { useAuthStore } from '@/stores/authStore';
import { useRouter, usePathname } from 'next/navigation';
import styles from '../app/styles/header.module.css';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const goToDashboard = () => {
    if (pathname !== '/admin') {
      router.push('/admin');
    }
  };

  const isDashboard = pathname === '/admin';

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 
          className={`${styles.title} ${isDashboard ? styles.staticTitle : ''}`}
          onClick={!isDashboard ? goToDashboard : undefined}
          style={{ cursor: !isDashboard ? 'pointer' : 'default' }}
        >
          Admin Panel
        </h1>
        <div className={styles.userControls}>
          <span className={styles.userEmail}>{user?.email}</span>
          <button
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}