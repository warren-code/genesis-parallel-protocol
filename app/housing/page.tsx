'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HousingRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/parallel-protocol#housing');
  }, [router]);

  return null;
}
