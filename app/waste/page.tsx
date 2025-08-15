'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WasteRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push('/loop-economics#waste');
  }, [router]);

  return null;
}
