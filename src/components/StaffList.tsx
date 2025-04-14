"use client";
import { useEffect, useState } from 'react';
import { useStaffStore } from '@/stores/staffStore';
import { useBusinessStore } from '@/stores/businessStore';
import { StaffForm } from './StaffForm';
import styles from '@/app/styles/dashboard.module.css';
import Link from 'next/link';
import type { StaffMember } from '@/stores/staffStore';
import type { Business } from '@/stores/businessStore';

interface StaffListProps {
  businessId?: number;
  onEditStaff?: (id: number | null) => void;
}

export function StaffList({ businessId, onEditStaff }: StaffListProps) {
  const { staff, fetchStaff, deleteStaff } = useStaffStore();
  const { businesses, fetchBusinesses } = useBusinessStore();
  const [editingStaff, setEditingStaff] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<number | 'all'>('all');

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchBusinesses(), fetchStaff()]);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchStaff, fetchBusinesses]);

  useEffect(() => {
    if (businessId) {
      setFilter(businessId);
    }
  }, [businessId]);

  // Update both internal and external edit states
  const handleEdit = (id: number) => {
    setEditingStaff(id);
    onEditStaff?.(id);
  };

  const handleSuccess = () => {
    setEditingStaff(null);
    onEditStaff?.(null);
    //fetchStaff(); // Refresh all staff data
  };

  const getBusinessName = (id: number): string => {
    const business = businesses.find((b: Business) => b.id === id);
    return business ? business.name : 'Unknown Business';
  };

  const filteredStaff = filter === 'all' 
  ? staff 
  : staff.filter((member: StaffMember) => member.businessId === filter);

if (isLoading) return <div className={styles.loading}>Loading staff...</div>;

  return (
    <div className={styles.dashboardContainer}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="p-2 border rounded"
              >
                <option value="all">All Businesses</option>
                {businesses.map((business) => (
                  <option key={business.id} value={business.id}>
                    {business.name}
                  </option>
                ))}
              </select>
          </div>
          <div className={styles.dataTableContainer}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Business</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No staff members found
                    </td>
                  </tr>
                ) : (
                  filteredStaff.map((member: StaffMember) => (
                    <tr key={member.id}>
                      <td>{member.firstName} {member.lastName}</td>
                      <td>
                        <span className={`${styles.positionBadge} ${
                          member.position === 'kitchen' ? styles.kitchen :
                          member.position === 'service' ? styles.service :
                          styles.pr
                        }`}>
                          {member.position}
                        </span>
                      </td>
                      <td>{member.email}</td>
                      <td>
                        {getBusinessName(member.businessId)}
                      </td>
                      <td>
                        <button 
                          onClick={() => handleEdit(member.id)}
                          className={styles.secondaryButton}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => deleteStaff(member.id)}
                          className={styles.dangerButton}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {editingStaff ? 'Edit Staff' : 'Add New Staff'}
          </h2>
          {businesses.length > 0 ? (
            <StaffForm 
            staffId={editingStaff}
            onSuccess={handleSuccess}
            businesses={businesses}
          />
          ) : (
            <div className={styles.errorText}>
              Cannot add staff - no businesses available. <Link href="/admin/businesses" className="text-blue-500 hover:underline">
                Create a business first
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}