const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Tiêu đề */}
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-6 text-center">
          Chính Sách Bảo Mật
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Cập nhật lần cuối: 17/09/2025
        </p>

        {/* Nội dung */}
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-pink-600 mb-2">
              1. Thông Tin Chúng Tôi Thu Thập
            </h2>
            <p>
              Chúng tôi có thể thu thập thông tin cá nhân như tên, email, số
              điện thoại khi bạn đăng ký hoặc sử dụng dịch vụ.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-600 mb-2">
              2. Cách Chúng Tôi Sử Dụng Thông Tin
            </h2>
            <p>
              Thông tin của bạn được dùng để cải thiện dịch vụ, gửi thông báo
              quan trọng và hỗ trợ trải nghiệm tốt hơn.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-600 mb-2">
              3. Bảo Mật Dữ Liệu
            </h2>
            <p>
              Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức để bảo vệ dữ
              liệu cá nhân của bạn khỏi truy cập trái phép.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-pink-600 mb-2">
              4. Quyền Của Người Dùng
            </h2>
            <p>
              Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá
              nhân bất kỳ lúc nào bằng cách liên hệ với chúng tôi.
            </p>
          </section>
        </div>

        {/* Nút liên hệ */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium shadow-md hover:shadow-lg transition">
            Liên Hệ Với Chúng Tôi
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
