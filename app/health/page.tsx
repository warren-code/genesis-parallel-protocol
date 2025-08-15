'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HealthRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/parallel-protocol#health');
  }, [router]);

  return null;
}
