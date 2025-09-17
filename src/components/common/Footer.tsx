const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                  <i className="fas fa-heart text-white"></i>
                </div>
                <span className="text-xl font-bold">LoveConnect</span>
              </div>
              <p className="text-gray-400">
                Kết nối trái tim, tạo dựng tình yêu
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sản Phẩm</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Tính Năng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Premium
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Bảo Mật
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ Trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Trung Tâm Trợ Giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    An Toàn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white cursor-pointer">
                    Liên Hệ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Theo Dõi Chúng Tôi</h4>
              <div className="flex space-x-4">
                <i className="fab fa-facebook text-2xl cursor-pointer hover:text-blue-500"></i>
                <i className="fab fa-instagram text-2xl cursor-pointer hover:text-pink-500"></i>
                <i className="fab fa-twitter text-2xl cursor-pointer hover:text-blue-400"></i>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LoveConnect. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
