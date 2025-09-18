const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Về Chúng Tôi
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          LoveConnect được xây dựng để kết nối những trái tim, mang đến một trải
          nghiệm hẹn hò thú vị và an toàn cho mọi người.
        </p>
      </section>

      {/* Nội dung */}
      <section className="flex-1 max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white mb-6">
            <i className="fas fa-heart text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Sứ Mệnh Của Chúng Tôi
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Tạo ra một cộng đồng hẹn hò trực tuyến nơi mọi người có thể kết nối,
            chia sẻ và tìm thấy tình yêu đích thực.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white mb-6">
            <i className="fas fa-users text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Đội Ngũ Của Chúng Tôi
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Chúng tôi là những người trẻ đam mê công nghệ, mong muốn xây dựng
            một nền tảng hẹn hò hiện đại, uy tín và an toàn.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white mb-6">
            <i className="fas fa-shield-alt text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            An Toàn & Bảo Mật
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Chúng tôi cam kết bảo mật thông tin cá nhân và mang đến môi trường
            an toàn cho tất cả người dùng.
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white mb-6">
            <i className="fas fa-star text-xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Tương Lai
          </h3>
          <p className="text-gray-600 leading-relaxed">
            LoveConnect sẽ không ngừng phát triển và mang đến nhiều tính năng
            mới, giúp hành trình tìm kiếm tình yêu thêm trọn vẹn.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
