"use client";
import { useForm } from 'react-hook-form';
import { useStaffStore } from '@/stores/staffStore';
import type { StaffMember } from '@/stores/staffStore';
import { Business } from '@/stores/businessStore';
import styles from '@/app/styles/dashboard.module.css';
import { useEffect } from 'react';
import Link from 'next/link';

interface StaffFormProps {
  staffId?: number | null;
  onSuccess?: () => void;
  businesses: Business[];
}

export function StaffForm({ staffId, onSuccess, businesses }: StaffFormProps) {
  const { addStaff, updateStaff, staff } = useStaffStore();
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors }, 
    watch,
    setError
  } = useForm<Omit<StaffMember, 'id'>>({
    defaultValues: {
      businessId: businesses[0]?.id || undefined
    }
  });

  const selectedBusinessId = watch('businessId');

  useEffect(() => {
    if (staffId) {
      const staffMember = staff.find(m => m.id === staffId);
      if (staffMember) {
        reset({
          firstName: staffMember.firstName,
          lastName: staffMember.lastName,
          email: staffMember.email,
          position: staffMember.position,
          phoneNumber: staffMember.phoneNumber,
          businessId: staffMember.businessId
        });
      }
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        position: 'service',
        phoneNumber: '',
        businessId: businesses[0]?.id || undefined
      });
    }
  }, [staffId, staff, reset, businesses]);

  const onSubmit = (data: Omit<StaffMember, 'id'>) => {
    const businessExists = businesses.some(b => b.id === data.businessId);
    if (!businessExists) {
    setError('businessId', {
      type: 'manual',
      message: 'Selected business does not exist'
    });
    return;
    }  
    if (staffId) {
      updateStaff({
        ...data,
        id: staffId,
        businessId: data.businessId
      });
    } else {
      addStaff({
        ...data,
        id: Date.now(),
        businessId: data.businessId
      });
    }  
    onSuccess?.();
    reset();
  };

  return (
    <form 
      id="staff-form"
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-4"
    >
      <div>
        <label className={styles.formLabel}>First Name *</label>
        <input
          {...register("firstName", { required: "First name is required" })}
          className={styles.inputField}
        />
        {errors.firstName && <span className={styles.errorText}>{errors.firstName.message}</span>}
      </div>

      <div>
        <label className={styles.formLabel}>Last Name *</label>
        <input
          {...register("lastName", { required: "Last name is required" })}
          className={styles.inputField}
        />
        {errors.lastName && <span className={styles.errorText}>{errors.lastName.message}</span>}
      </div>

      <div>
        <label className={styles.formLabel}>Email *</label>
        <input
          type="email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          className={styles.inputField}
        />
        {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
      </div>

      <div>
        <label className={styles.formLabel}>Position *</label>
        <select
          {...register("position", { required: "Position is required" })}
          className={styles.inputField}
        >
          <option value="kitchen">Kitchen</option>
          <option value="service">Service</option>
          <option value="PR">PR</option>
        </select>
      </div>

      <div>
        <label className={styles.formLabel}>Business *</label>
        <select
          {...register("businessId", { 
            required: "Business is required",
            valueAsNumber: true,
            validate: (value) => !!value || "Please select a business"
          })}
          className={styles.inputField}
        >
          <option value="">Select a business</option>
          {businesses.map(business => (
            <option key={business.id} value={business.id}>
              {business.name} ({business.type})
            </option>
          ))}
        </select>
        {errors.businessId && (
          <span className={styles.errorText}>
            Please select a business or 
            <Link href="/admin/businesses" className="text-blue-500 hover:underline text-xs"> create</Link> a new one.
          </span>
        )}
        {selectedBusinessId && businesses.some(b => b.id === selectedBusinessId) && (
          <div className="mt-1 text-sm text-gray-500">
            {businesses.find(b => b.id === selectedBusinessId)?.location}
          </div>
        )}
      </div>

      <div>
        <label className={styles.formLabel}>Phone Number</label>
        <input
          type="tel"
          {...register("phoneNumber")}
          className={styles.inputField}
          placeholder="Optional"
        />
      </div>

      {!staffId &&(<button 
        type="submit" 
        className={styles.actionButton}
      >
        Add Staff
      </button>)}
    </form>
  );
}