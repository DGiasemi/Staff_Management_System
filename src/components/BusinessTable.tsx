"use client";
import { useBusinessStore } from '@/stores/businessStore';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import styles from '@/app/styles/dashboard.module.css';
import { BusinessForm } from './BusinessForm';

export function BusinessTable() {
  const { businesses, fetchBusinesses, deleteBusiness } = useBusinessStore();
  const [editingBusiness, setEditingBusiness] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchBusinesses();
      } catch (error) {
        console.error("Failed to load businesses:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchBusinesses]);

  const filteredBusinesses = useMemo(() => {
    if (!businesses) return [];
    return typeFilter === 'all' 
      ? businesses 
      : businesses.filter(business => business?.type === typeFilter);
  }, [businesses, typeFilter]);

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Location',
        accessorKey: 'location',
      },
      {
        header: 'Type',
        accessorKey: 'type',
        cell: ({ getValue }: { getValue: () => any }) => {
          const type = getValue();
          return type ? (
            <span className={`${styles.businessType} ${styles[type]}`}>
              {type}
            </span>
          ) : '-';
        },
      },
      {
        header: 'Actions',
        cell: ({ row }: { row: any }) => (
          <div className="flex gap-2">
            <button 
              onClick={() => setEditingBusiness(row.original.id)}
              className={styles.secondaryButton}
            >
              Edit
            </button>
            <button 
              onClick={() => deleteBusiness(row.original.id)}
              className={styles.dangerButton}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredBusinesses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEditSuccess = () => {
    setEditingBusiness(null);
  };

  if (isLoading) return <div className={styles.loading}>Loading businesses...</div>;

  return (
    <div>
      {/* Edit Form Modal */}
      {editingBusiness && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h1 className={styles.pageTitle}>Edit Business</h1>
            <BusinessForm 
              business={businesses.find(b => b.id === editingBusiness)} 
              onSuccess={handleEditSuccess}
            />
            <div className={styles.modalActions}>
              <button 
                type="submit" 
                form="business-form" 
                className={styles.actionButton}
              >
                Update Business
              </button>
              <button 
                onClick={() => setEditingBusiness(null)}
                className={styles.secondaryButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Type Filter Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-primaryText bg-white"
        >
          <option value="all">All Types</option>
          <option value="bar">Bar</option>
          <option value="restaurant">Restaurant</option>
          <option value="club">Club</option>
          <option value="hotel">Hotel</option>
          <option value="cafe">Cafe</option>
        </select>
      </div>

      {/* Business Table */}
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
                  No businesses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}