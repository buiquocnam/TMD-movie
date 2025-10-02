'use client';

import { Search, User, LogIn, Film } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form';
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { useUser, useLogout } from '@/lib/auth';

export const Header = () => {
  const user = useUser();
  const router = useRouter();
  const logout = useLogout({
    onSuccess: () => router.push(paths.home.getHref()),
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={paths.home.getHref()}
            className="group flex items-center space-x-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-md transition-transform group-hover:scale-105">
              <Film className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
              MovieDB
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden flex-1 max-w-lg mx-6 md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm phim..."
                className="w-full rounded-full pl-10 pr-4 py-2 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 transition"
                registration={{}}
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              href={paths.movies.popular.getHref()}
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Phim
            </Link>
            <Link
              href={paths.public.discussions.getHref()}
              className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
            >
              Thảo Luận
            </Link>

            {/* User Menu */}
            {user.data ? (
              <div className="flex items-center space-x-2">
                <Link href={paths.user.profile.getHref()}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-gray-300 hover:border-indigo-500 hover:text-indigo-600 transition"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Hồ Sơ
                  </Button>
                </Link>
               
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => logout.mutate()}
                  className="text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition"
                >
                  Đăng Xuất
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href={paths.auth.login.getHref()}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-gray-300 hover:border-indigo-500 hover:text-indigo-600 transition gap"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Đăng Nhập
                  </Button>
                </Link>
                <Link href={paths.auth.register.getHref()}>
                  <Button
                    size="sm"
                    className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition"
                  >
                    Đăng Ký
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
