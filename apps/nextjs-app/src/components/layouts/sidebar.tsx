'use client';

import { Star } from 'lucide-react';
import { TopRatedMoviesList } from '@/features/movies/components/top-rated-movies-list';

export const Sidebar = () => {
  return (
    <aside className=" bg-[#111] p-4 rounded-lg space-y-6">
      {/* Tiêu đề */}
      <div className="flex items-center border-b border-gray-700 pb-2">
        <Star className="h-5 w-5 text-yellow-400 mr-2" />
        <h2 className="text-lg font-bold uppercase tracking-wide text-yellow-400">
          Phim Đề Cử
        </h2>
      </div>

      {/* Danh sách phim */}
      <TopRatedMoviesList />
    </aside>
  );
};
