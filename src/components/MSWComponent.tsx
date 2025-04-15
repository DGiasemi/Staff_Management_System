'use client';

import { useEffect } from 'react';

export default function MSWProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const { worker } = require('@/mocks/browser');
      worker.start({
        onUnhandledRequest: 'bypass'
      });
    }
  }, []);

  return null;
}