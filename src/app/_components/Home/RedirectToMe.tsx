'use client';
import { useEffect } from 'react';
import userGlobalQuery from '@/common/query';
import { useRouter } from 'next/navigation';
import useGlobalStore from '@/index';

export default function RedirectToMe() {
  const { data: auth, isLoading } = userGlobalQuery.useAuth();
  const router = useRouter();

  console.log('auth', auth);
  useEffect(() => {
    if (!isLoading && !auth?.email && !auth?.isAuthenticated) {
      useGlobalStore.getState().setShowSignUpModal(true);
    }

    if (!auth?.personalUrl) return;
    router.push(`/${auth.personalUrl}`);
  }, [auth, isLoading, router]);
  return null;
}
