'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CultureRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/culture-memetics');
  }, [router]);

  return null;
}
