// Genre mapping utility for movie genres
export interface Genre {
    id: number;
    name: string;
  }
  
  // Static genre data from TMDB API
  export const GENRES: Genre[] = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];
  
  // Tạo Map để tra cứu nhanh theo ID
  export const GENRE_MAP = new Map<number, string>(
    GENRES.map((genre) => [genre.id, genre.name])
  );
  
  /**
   * Lấy tên thể loại theo ID
   * @param id - ID thể loại
   * @returns Tên thể loại hoặc undefined nếu không tồn tại
   */
  export const getGenreById = (id: number): string | undefined => {
    return GENRE_MAP.get(id);
  }
  
  /**
   * Lấy nhiều tên thể loại từ mảng ID
   * @param ids - Mảng ID thể loại
   * @returns Mảng tên thể loại (loại bỏ các giá trị undefined)
   */
  export const getGenresByIds = (ids: number[]): string[] => {
    return ids
      .map((id) => getGenreById(id))
      .filter((name): name is string => name !== undefined);
  }
  
  /**
   * Lấy tên thể loại dưới dạng chuỗi, phân cách bằng dấu phân tách
   * @param ids - Mảng ID thể loại
   * @param separator - Dấu phân tách (mặc định: ', ')
   * @returns Chuỗi tên thể loại
   */
  export const formatGenres = (ids: number[], separator: string = ', '): string => {
    return getGenresByIds(ids).join(separator);
  }
  
  /**
   * Kiểm tra ID thể loại có hợp lệ không
   * @param id - ID thể loại cần kiểm tra
   * @returns true nếu tồn tại trong GENRE_MAP, false nếu không
   */
  export const isValidGenreId = (id: number): boolean => {
    return GENRE_MAP.has(id);
  }
  