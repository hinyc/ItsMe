'use client';
import { useEffect } from 'react';
import userGlobalQuery from '@/common/query';
import { useRouter } from 'next/navigation';
import useGlobalStore from '@/index';

export default function RedirectToMe() {
  const auth = userGlobalQuery.useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && auth.data && !auth.data.email) {
      useGlobalStore.getState().setShowSignUpModal(true);
    }

    if (!auth.data?.personalUrl) return;
    router.push(`/${auth.data.personalUrl}`);
  }, [auth.data, auth.isLoading, router]);
  return null;
}
