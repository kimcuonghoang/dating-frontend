import React, { useState } from "react";
import { message, Switch } from "antd";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-16 px-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
          Cài Đặt Tài Khoản
        </h1>

        <div className="space-y-6">
          {/* Notifications */}
          <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Thông báo</h2>
              <p className="text-gray-500 text-sm">
                Nhận thông báo khi có tin nhắn mới hoặc lượt thích.
              </p>
            </div>
            <Switch
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="bg-pink-500"
            />
          </div>

          {/* Privacy Mode */}
          <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Chế độ riêng tư
              </h2>
              <p className="text-gray-500 text-sm">
                Ẩn hồ sơ của bạn khỏi người khác khi bật.
              </p>
            </div>
            <Switch
              checked={privacyMode}
              onChange={() => setPrivacyMode(!privacyMode)}
              className="bg-pink-500"
            />
          </div>

          {/* Account Actions */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button className="flex-1 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium shadow-md hover:shadow-lg transition">
              Đổi Mật Khẩu
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                setUserRole("guest");
                setUsername(null);
                message.info("Đã đăng xuất!");
              }}
              className="flex-1 px-6 py-3 rounded-full bg-gray-100 text-gray-800 font-medium shadow-md hover:bg-gray-200 transition"
            >
              Đăng Xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
