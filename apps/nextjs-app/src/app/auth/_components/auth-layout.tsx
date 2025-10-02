'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser } from '@/lib/auth';

type LayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === paths.auth.login.getHref();

  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  useEffect(() => {
    if (user.data) {
      router.replace(
        `${redirectTo ? `${decodeURIComponent(redirectTo)}` : paths.home.getHref()}`,
      );
    }
  }, [user.data, router, redirectTo]);

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
    </div>
  );
};
