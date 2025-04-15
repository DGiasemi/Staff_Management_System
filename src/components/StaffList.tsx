"use client";
import { useEffect, useMemo, useState } from 'react';
import { useStaffStore } from '@/stores/staffStore';
import { useBusinessStore } from '@/stores/businessStore';
import { StaffForm } from './StaffForm';
import styles from '@/app/styles/dashboard.module.css';
import Link from 'next/link';
import type { StaffMember } from '@/stores/staffStore';
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table';

interface StaffListProps {
  businessId?: number;
  onEditStaff?: (id: number | null) => void;
}

export function StaffList({ onEditStaff }: StaffListProps) {
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

  const columns = useMemo<ColumnDef<StaffMember>[]>(
    () => [
      {
        header: 'Name',
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      },
      {
        header: 'Position',
        accessorKey: 'position',
        cell: (info) => (
          <span className={`${styles.positionBadge} ${
            info.getValue() === 'kitchen' ? styles.kitchen :
            info.getValue() === 'service' ? styles.service :
            styles.pr
          }`}>
            {info.getValue() as string}
          </span>
        ),
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Business',
        accessorKey: 'businessId',
        cell: (info) => {
          const business = businesses.find(b => b.id === info.getValue());
          return business ? `${business.name} (${business.type || 'No type'})` : 'Unknown';
        },
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button 
              onClick={() => handleEdit(row.original.id)}
              className={styles.secondaryButton}
            >
              Edit
            </button>
            <button 
              onClick={() => deleteStaff(row.original.id)}
              className={styles.dangerButton}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [businesses]
  );

  const filteredStaff = filter === 'all' 
    ? staff 
    : staff.filter((member: StaffMember) => member.businessId === filter);

  const table = useReactTable({
    data: filteredStaff,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (id: number) => {
    setEditingStaff(id);
    onEditStaff?.(id);
  };

  const handleSuccess = () => {
    setEditingStaff(null);
    onEditStaff?.(null);
  };

  if (isLoading) return <div className={styles.loading}>Loading staff...</div>;

  return (
    <div className={styles.dashboardContainer}>
      {editingStaff && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h1 className={styles.pageTitle}>Edit Staff Member</h1>
            <StaffForm 
              staffId={editingStaff}
              onSuccess={handleSuccess}
              businesses={businesses}
            />
            <div className={styles.modalActions}>
              <button 
                type="submit" 
                form="staff-form" 
                className={styles.actionButton}
              >
                Update Staff
              </button>
              <button 
                onClick={() => setEditingStaff(null)}
                className={styles.secondaryButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-end mb-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="p-2 border border-gray-300 rounded text-primaryText bg-white"
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
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                      No staff members found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className={styles.pageTitle}>Add New Staff</h1>
          {businesses.length > 0 ? (
            <StaffForm 
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