import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-white px-6">
      {/* Icon */}
      <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-8 shadow-lg">
        <i className="fas fa-exclamation-triangle text-white text-5xl"></i>
      </div>

      {/* Nội dung */}
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3">
        Trang không tồn tại
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-8">
        Có vẻ như bạn đã đi lạc. Trang bạn tìm kiếm không tồn tại hoặc đã bị di
        chuyển.
      </p>

      {/* Nút quay lại */}
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium shadow-md hover:shadow-lg transition"
      >
        Quay về Trang Chủ
      </Link>
    </div>
  );
};

export default NotFoundPage;
