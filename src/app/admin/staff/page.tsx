"use client";
import { useState } from 'react';
import { StaffList } from '@/components/StaffList';
import styles from '@/app/styles/dashboard.module.css';

export default function StaffManagementPage() {
  const [, setEditingStaff] = useState<number | null>(null);
  const businessId = 1;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Staff Management</h1>
      </div>
      <StaffList 
        businessId={businessId}
        onEditStaff={setEditingStaff}
      />
    </div>
  );
}