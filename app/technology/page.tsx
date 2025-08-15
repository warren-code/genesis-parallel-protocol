'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TechnologyRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/parallel-protocol#technology');
  }, [router]);

  return null;
}
