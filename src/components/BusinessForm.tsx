"use client";
import { useForm } from 'react-hook-form';
import { useBusinessStore } from '@/stores/businessStore';
import type { Business } from '@/stores/businessStore';
import styles from '@/app/styles/dashboard.module.css';
import { useEffect } from 'react';

interface BusinessFormProps {
  business?: Business | null;
  onSuccess?: () => void;
}

export function BusinessForm({ business, onSuccess }: BusinessFormProps) {
  const { addBusiness, updateBusiness } = useBusinessStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Business>();

  useEffect(() => {
    reset(business || {
      name: '',
      location: '',
      type: undefined
    });
  }, [business, reset]);

  const onSubmit = (data: Business) => {
    if (business?.id) {
      updateBusiness({ ...data, id: business.id });
    } else {
      addBusiness(data);
    }
    onSuccess?.();
    reset();
  };

  return (
    <form id="business-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className={styles.formLabel}>Business Name*</label>
        <input
          {...register("name", { required: "Name is required" })}
          className={styles.inputField}
        />
        {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
      </div>

      <div>
        <label className={styles.formLabel}>Location*</label>
        <input
          {...register("location", { required: "Location is required" })}
          className={styles.inputField}
        />
        {errors.location && <span className={styles.errorText}>{errors.location.message}</span>}
      </div>

      <div>
        <label className={styles.formLabel}>Business Type</label>
        <select
          {...register("type")}
          className={styles.inputField}
        >
          <option value="">Select type...</option>
          <option value="bar">Bar</option>
          <option value="restaurant">Restaurant</option>
          <option value="club">Club</option>
          <option value="hotel">Hotel</option>
          <option value="cafe">Cafe</option>
        </select>
      </div>

      {!business && (<button type="submit" className={styles.actionButton}>
        {'Add Business'}
      </button>)}
    </form>
  );
}