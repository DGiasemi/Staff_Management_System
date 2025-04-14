"use client";
import { useState } from 'react';
import { BusinessTable } from '@/components/BusinessTable';
import { BusinessForm } from '@/components/BusinessForm';
import styles from '@/app/styles/dashboard.module.css';

export default function BusinessManagementPage() {
  const [editingBusiness, setEditingBusiness] = useState<number | null>(null);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Business Management</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BusinessTable />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className={styles.pageTitle}>
            {editingBusiness ? 'Edit Business' : 'Add New Business'}
          </h1>
          <BusinessForm 
            business={editingBusiness ? { id: editingBusiness, name: '', location: '' } : null}
            onSuccess={() => setEditingBusiness(null)}
          />
        </div>
      </div>
    </div>
  );
}