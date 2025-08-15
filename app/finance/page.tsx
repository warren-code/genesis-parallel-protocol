'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FinanceRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dao-governance#finance');
  }, [router]);

  return null;
}
