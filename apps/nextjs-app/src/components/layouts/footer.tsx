
import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.svg" alt="MovieDB" className="h-8 w-8" />
              <span className="text-xl font-bold">MovieDB</span>
            </div>
            <p className="text-gray-400 mb-4">
              Khám phá và tìm hiểu thế giới điện ảnh. Tìm bộ phim yêu thích tiếp theo của bạn,
              đọc thảo luận và kết nối với những người đam mê phim.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243s.122-.928.49-1.243c.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243s-.122.928-.49 1.243c-.369.315-.807.49-1.297.49z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Kết Nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href={paths.movies.popular.getHref()} className="text-gray-400 hover:text-white">
                  Phim
                </Link>
              </li>
              <li>
                <Link href={paths.movies.popular.getHref()} className="text-gray-400 hover:text-white">
                  Phim Phổ Biến
                </Link>
              </li>
              <li>
                <Link href={paths.movies.topRated.getHref()} className="text-gray-400 hover:text-white">
                  Phim Đánh Giá Cao
                </Link>
              </li>
              <li>
                <Link href={paths.public.discussions.getHref()} className="text-gray-400 hover:text-white">
                  Thảo Luận
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Trung Tâm Trợ Giúp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Liên Hệ Chúng Tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Chính Sách Bảo Mật
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Điều Khoản Dịch Vụ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 MovieDB. All rights reserved. Built with Next.js and React.
          </p>
        </div>
      </div>
    </footer>
  );
};

