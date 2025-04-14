"use client";
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from '@/stores/authStore';
import styles from './styles/login.module.css';

export default function LoginPage() {
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      const success = await login(email, password);
      if (success) {
        window.location.href = '/admin';
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.loginTitle}>Enter Admin Panel</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className={styles.inputField}
              required
              autoComplete="off"
            />
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className={styles.inputField}
                required
                autoComplete="off"
              />
              <button
                type="button"
                className={styles.toggleVisibility}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          <div className={styles.credentialsHint}>
            Please use admin@example.com and password123 for testing.
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>
      </div>
    </div>
  );
}