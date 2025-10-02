import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Spinner } from '@/components/ui/spinner';

export const metadata = {
  title: 'Profile - Bulletproof React',
  description: 'User Profile Management',
};

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-5xl">
        <Suspense
          fallback={
            <div className="flex min-h-[400px] items-center justify-center">
              <Spinner size="xl" />
            </div>
          }
        >
          <ErrorBoundary
            fallback={
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="rounded-xl bg-white p-6 shadow text-center">
                  <h2 className="text-xl font-bold text-red-600">Something went wrong!</h2>
                  <p className="text-gray-600 mt-2">Please try again later.</p>
                </div>
              </div>
            }
          >
            {children}
          </ErrorBoundary>
        </Suspense>
      </div>
    </main>
  );
};

export default ProfileLayout;
