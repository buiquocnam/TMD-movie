'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useUser } from '@/lib/auth';
import { paths } from '@/config/paths';
import { useProfile } from '@/features/profile/api/get-profile';
import { ProfileInfo } from '@/features/profile/components/profile-info';
import { ProfileActions } from '@/features/profile/components/profile-actions';
import { getTMDBSessionCookie } from '@/utils/auth';

export default function ProfilePage() {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const sessionId = getTMDBSessionCookie();
  const { data: profile, isLoading: profileLoading, error } = useProfile(sessionId ?? '', {
    enabled: !!sessionId,
  });

  // Authentication Guard
  useEffect(() => {
    if (!user.data && !user.isLoading) {
      router.replace(paths.auth.login.getHref(pathname));
    }
  }, [user.data, user.isLoading, router, pathname]);

  const isLoading = user.isLoading || (user.data && profileLoading);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user.data) return null;

  if (error || !profile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-xl bg-white p-6 shadow text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600">Unable to load your profile. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your personal information</p>
      </header>

      {/* Profile Details */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ProfileInfo profile={profile} />
        </div>
        <aside>
          <ProfileActions />
        </aside>
      </div>
    </section>
  );
}
