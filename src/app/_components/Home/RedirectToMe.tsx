'use client';
import { useEffect } from 'react';
import userGlobalQuery from '@/query';

export default function RedirectToMe() {
  const { data } = userGlobalQuery.useUser();
  console.log(data);

  useEffect(() => {
    if (!data?.personalUrl) return;
    window.location.href = data.personalUrl;
  }, [data]);
  return null;
}
