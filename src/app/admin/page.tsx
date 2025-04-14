"use client";
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/dashboard.module.css';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
      </div>

      <div className={styles.dashboardGrid}>
        <div 
          className={styles.card}
          onClick={() => router.push('/admin/businesses')}
        >
          <h2 className={styles.cardTitle}>Business Management</h2>
          <p className={styles.cardSubtitle}>View and manage all business locations</p>
        </div>
        
        <div 
          className={styles.card}
          onClick={() => router.push('/admin/staff')}
        >
          <h2 className={styles.cardTitle}>Staff Management</h2>
          <p className={styles.cardSubtitle}>Manage staff members and their details</p>
        </div>
      </div>
    </div>
  );
}