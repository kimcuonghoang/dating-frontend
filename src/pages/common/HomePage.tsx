// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import { Button, Card } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import * as echarts from "echarts";
import { Link } from "react-router-dom";
const HomePage: React.FC = () => {
  const [userRole, setUserRole] = useState<"guest" | "user" | "admin">("guest");

  useEffect(() => {
    if (userRole === "admin") {
      const chartDom = document.getElementById("matchChart");
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          animation: false,
          title: {
            text: "Thống Kê Match Theo Ngày",
            left: "center",
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [1220, 1832, 1501, 1834, 2290, 2130, 1920],
              type: "line",
              smooth: true,
              itemStyle: {
                color: "#ff4458",
              },
            },
          ],
        };
        myChart.setOption(option);
      }
    }
  }, [userRole]);

  // Guest Landing Page
  if (userRole === "guest") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
        <style>{`
.!rounded-button {
border-radius: 12px;
}
body {
min-height: 1024px;
}
`}</style>

        <section
          className="pt-20 pb-20 px-6 min-h-screen flex items-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=romantic%20couple%20silhouette%20sunset%20background%20soft%20pink%20and%20orange%20gradients%20dreamy%20atmosphere%20modern%20dating%20app%20hero%20section%20perfect%20lighting&width=1440&height=800&seq=hero1&orientation=landscape')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl">
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Tìm Kiếm
                <span className="block bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                  Tình Yêu Đích Thực
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Khám phá những mối quan hệ ý nghĩa với LoveConnect. Gặp gỡ người
                phù hợp, tạo dựng kết nối chân thật và bắt đầu hành trình tình
                yêu của bạn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={"/features"}
                  type="primary"
                  className="!rounded-button whitespace-nowrap cursor-pointer text-lg px-8 py-3 h-auto bg-gradient-to-r from-pink-500 to-red-500 border-0"
                >
                  Tìm Nửa Kia Ngay
                </Link>
                <Button
                  size="large"
                  className="!rounded-button whitespace-nowrap cursor-pointer text-lg px-8 py-3 h-auto border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  Tìm Hiểu Thêm
                </Button>
              </div>
              <div className="mt-8 flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-users text-pink-500"></i>
                  <span>25K+ thành viên</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-heart text-pink-500"></i>
                  <span>15K+ cặp đôi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-star text-pink-500"></i>
                  <span>4.8★ đánh giá</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Tính Năng Đặc Biệt
              </h2>
              <p className="text-xl text-gray-600">
                Trải nghiệm hẹn hò hiện đại và thú vị
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer !rounded-button">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-heart text-3xl text-pink-600"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Smart Matching</h3>
                <p className="text-gray-600">
                  Thuật toán thông minh giúp bạn tìm kiếm người phù hợp nhất dựa
                  trên sở thích và tính cách
                </p>
              </Card>
              <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer !rounded-button">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-swatchbook text-3xl text-red-600"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4">Swipe & Match</h3>
                <p className="text-gray-600">
                  Giao diện thân thiện với tính năng vuốt trái phải, tạo kết nối
                  nhanh chóng và thú vị
                </p>
              </Card>
              <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer !rounded-button">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-shield-alt text-3xl text-purple-600"></i>
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  An Toàn & Bảo Mật
                </h3>
                <p className="text-gray-600">
                  Hệ thống xác thực nghiêm ngặt và bảo mật cao, đảm bảo môi
                  trường hẹn hò an toàn
                </p>
              </Card>
            </div>
          </div>
        </section>
        {/* Success Stories */}
        <section className="py-20 bg-gradient-to-r from-pink-50 to-red-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Câu Chuyện Thành Công
              </h2>
              <p className="text-xl text-gray-600">
                Những cặp đôi hạnh phúc đã tìm thấy tình yêu
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 !rounded-button border-0 shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src="https://readdy.ai/api/search-image?query=happy%20young%20asian%20couple%20smiling%20together%20romantic%20portrait%20warm%20lighting%20success%20story%20photography&width=80&height=80&seq=couple1&orientation=squarish"
                    alt="Couple"
                    className="w-16 h-16 rounded-full mr-4 object-cover object-top"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">Minh & Linh</h4>
                    <p className="text-gray-500">Kết hôn sau 2 năm</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Chúng tôi đã gặp nhau trên LoveConnect và ngay lập tức cảm
                  thấy có điểm chung. Sau 2 năm hẹn hò, chúng tôi đã tổ chức đám
                  cưới và rất hạnh phúc!"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </Card>
              <Card className="p-8 !rounded-button border-0 shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src="https://readdy.ai/api/search-image?query=happy%20young%20asian%20couple%20engagement%20ring%20romantic%20portrait%20warm%20lighting%20success%20story%20photography&width=80&height=80&seq=couple2&orientation=squarish"
                    alt="Couple"
                    className="w-16 h-16 rounded-full mr-4 object-cover object-top"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">Quang & Hương</h4>
                    <p className="text-gray-500">Đính hôn gần đây</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "LoveConnect đã giúp chúng tôi tìm thấy nhau trong số hàng
                  ngàn người. Chúng tôi vừa đính hôn và đang chuẩn bị cho đám
                  cưới vào năm sau!"
                </p>
                <div className="flex text-yellow-400 mt-4">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </Card>
            </div>
          </div>
        </section>
        {/* Footer */}
      </div>
    );
  }
};
export default HomePage;
