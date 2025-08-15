'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TransportRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/parallel-protocol#transport');
  }, [router]);

  return null;
}
