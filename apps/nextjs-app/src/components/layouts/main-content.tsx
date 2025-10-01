'use client';

import { PopularMoviesList } from '@/features/movies/components/popular-movies-list';
import { Link } from '@/components/ui/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { paths } from '@/config/paths';
import { Sidebar } from './sidebar';

export const MainContent = () => {
  return (
    <main className="flex-1 bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">
      <div className="max-w-7xl mx-auto ">
        {/* 🌟 HERO */}
        <section className="relative flex flex-col items-center justify-center text-center px-6 py-16 md:py-28 overflow-hidden rounded-xl">
          {/* Content */}
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

        {/* 💎 Quick Links */}
        <section className="px-6 md:px-10 py-20 space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-300 drop-shadow-lg">
            💎 Khám Phá Thêm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Top Rated */}
            <Card className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:shadow-purple-500/40 shadow-lg">
              <Link href={paths.movies.topRated.getHref()}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-purple-300 group-hover:text-purple-400 transition-colors">
                    🏆 Phim Đánh Giá Cao
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-200 text-sm group-hover:text-white transition-colors">
                  Khám phá những bộ phim được giới phê bình khen ngợi nhất.
                </CardContent>
              </Link>
            </Card>

            {/* Now Playing */}
            <Card className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 transition-all duration-300 hover:scale-105 hover:border-pink-400 hover:shadow-pink-500/40 shadow-lg">
              <Link href={paths.movies.nowPlaying.getHref()}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-pink-300 group-hover:text-pink-400 transition-colors">
                    🍿 Đang Chiếu
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-200 text-sm group-hover:text-white transition-colors">
                  Cập nhật những bom tấn đang hot tại rạp chiếu phim.
                </CardContent>
              </Link>
            </Card>

            {/* Discussions */}
            <Card className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1 transition-all duration-300 hover:scale-105 hover:border-yellow-400 hover:shadow-yellow-500/40 shadow-lg">
              <Link href={paths.public.discussions.getHref()}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-yellow-300 group-hover:text-yellow-400 transition-colors">
                    💬 Thảo Luận Phim
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-200 text-sm group-hover:text-white transition-colors">
                  Tham gia các cuộc trò chuyện sôi nổi với cộng đồng mê phim.
                </CardContent>
              </Link>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};
