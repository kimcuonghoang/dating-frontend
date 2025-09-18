const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-16 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Thông tin liên hệ */}
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-6">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-gray-600 mb-6">
            Nếu bạn có bất kỳ câu hỏi nào, vui lòng điền vào form hoặc liên hệ
            trực tiếp qua thông tin dưới đây.
          </p>

          <div className="space-y-4">
            <p className="text-gray-700">
              📍 <span className="font-medium">Địa chỉ:</span> 123 Nguyễn Trãi,
              Hà Nội
            </p>
            <p className="text-gray-700">
              📞 <span className="font-medium">Điện thoại:</span> 0123 456 789
            </p>
            <p className="text-gray-700">
              ✉️ <span className="font-medium">Email:</span> support@example.com
            </p>
          </div>
        </div>

        {/* Form liên hệ */}
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Gửi Tin Nhắn
          </h2>
          <form className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-2">Họ và tên</label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Tin nhắn</label>
              <textarea
                rows={5}
                placeholder="Nhập nội dung tin nhắn"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium shadow-md hover:shadow-lg transition"
            >
              Gửi Ngay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
