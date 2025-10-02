'use client';

import { PopularMoviesList } from '@/features/movies/components/popular-movies-list';
import { Link } from '@/components/ui/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { paths } from '@/config/paths';
import { Sidebar } from './sidebar';

export const MainContent = () => {
  return (
    <main className="flex-1 relative text-white">
      {/* Background Galaxy */}
      <div className="absolute inset-0 
  bg-[url('https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=2050&auto=format&fit=crop')] 
  bg-cover bg-center bg-fixed opacity-80" />
      {/* Overlay gradient để chữ dễ đọc */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-purple-900/60 to-black/20" />

      {/* Nội dung */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 🌟 HERO */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-16 md:py-28 overflow-hidden rounded-xl">
          <div className="relative z-10 max-w-3xl space-y-5 md:space-y-6 px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
              Chào Mừng Đến Với <span className="text-pink-400">MovieDB</span>
            </h1>

            <p className="text-base md:text-lg text-gray-200 drop-shadow-lg leading-relaxed">
              🌌 Khám phá kho phim khổng lồ, đọc review cực chất và tham gia
              thảo luận cùng cộng đồng đam mê điện ảnh.
            </p>

            <Link
              href={paths.movies.popular.getHref()}
              className="inline-block mt-6 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 px-7 py-3 text-lg font-semibold text-white shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              🚀 Bắt Đầu Khám Phá
            </Link>
          </div>
        </section>

        {/* Sidebar */}
        <div className="px-4 md:px-6">
          <Sidebar />
        </div>

        {/* 🔥 Popular Movies */}
        <section className="px-6 md:px-10 py-16 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-yellow-400 drop-shadow-md flex items-center gap-2">
              🔥 Phim Phổ Biến
            </h2>
            <Link
              href={paths.movies.popular.getHref()}
              className="text-yellow-300 hover:text-yellow-400 font-semibold transition-colors"
            >
              Xem Tất Cả →
            </Link>
          </div>

          <PopularMoviesList />
        </section>
      </div>
    </main>
  );
};
