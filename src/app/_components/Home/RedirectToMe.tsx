'use client';
import { useEffect } from 'react';
import userGlobalQuery from '@/query';
import { useRouter } from 'next/navigation';
import useGlobalStore from '@/index';

export default function RedirectToMe() {
  const auth = userGlobalQuery.useAuth();
  const router = useRouter();

  console.log(auth.data);
  useEffect(() => {
    if (!auth.isLoading && auth.data && !auth.data.email) {
      console.log('show modal', !auth.data);
      useGlobalStore.getState().setShowSignUpModal(true);
    }

    if (!auth.data?.personalUrl) return;
    router.push(`/me/${auth.data.personalUrl}`);
  }, [auth.data, auth.isLoading, router]);
  return null;
}
