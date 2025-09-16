import { Button, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authLogin, authRegister } from "../../common/api/authApi";

const Header = () => {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [userRole, setUserRole] = useState<"guest" | "user" | "admin">("guest");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "male",
  });

  // Mutation cho login
  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => authLogin(data),
    onSuccess: (res) => {
      setUserRole("user");
      setShowAuthModal(false);
      message.success("Đăng nhập thành công!");
      // Có thể lưu token vào localStorage nếu API trả về
      const { accessToken, user } = res.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message || "Đăng nhập thất bại!");
    },
  });

  // Mutation cho register
  const registerMutation = useMutation({
    mutationFn: (data: any) => authRegister(data),
    onSuccess: (res) => {
      setUserRole("user");
      setShowAuthModal(false);
      message.success("Đăng ký thành công!");
      localStorage.setItem("token", res.data.token);
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message || "Đăng ký thất bại!");
    },
  });

  const handleAuth = () => {
    if (authMode === "login") {
      if (!authForm.email || !authForm.password) {
        return message.warning("Vui lòng điền đầy đủ thông tin!");
      }
      loginMutation.mutate({
        email: authForm.email,
        password: authForm.password,
      });
    } else {
      if (
        !authForm.email ||
        !authForm.password ||
        !authForm.name ||
        !authForm.age
      ) {
        return message.warning("Vui lòng điền đầy đủ thông tin!");
      }
      registerMutation.mutate(authForm);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
              <i className="fas fa-heart text-white text-xl"></i>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
              LoveConnect
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/features"
              className="text-gray-600 hover:text-pink-600 transition-colors cursor-pointer"
            >
              Tính Năng
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-pink-600 transition-colors cursor-pointer"
            >
              Giới Thiệu
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-pink-600 transition-colors cursor-pointer"
            >
              Liên Hệ
            </Link>
            <Button
              type="primary"
              className="!rounded-button whitespace-nowrap cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 border-0"
              onClick={() => setShowAuthModal(true)}
            >
              Bắt Đầu Hẹn Hò
            </Button>

            {/* Auth Modal */}
            <Modal
              open={showAuthModal}
              onCancel={() => setShowAuthModal(false)}
              footer={null}
              width={400}
              className="!rounded-button"
            >
              <div className="py-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-heart text-2xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {authMode === "login" ? "Đăng Nhập" : "Đăng Ký"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {authMode === "login"
                      ? "Chào mừng trở lại!"
                      : "Tạo tài khoản mới"}
                  </p>
                </div>

                <div className="space-y-4">
                  {authMode === "register" && (
                    <>
                      <Input
                        placeholder="Họ và tên"
                        value={authForm.name}
                        onChange={(e) =>
                          setAuthForm({ ...authForm, name: e.target.value })
                        }
                        className="!rounded-button"
                        prefix={<i className="fas fa-user text-gray-400"></i>}
                      />
                      <Input
                        placeholder="Tuổi"
                        value={authForm.age}
                        onChange={(e) =>
                          setAuthForm({ ...authForm, age: e.target.value })
                        }
                        className="!rounded-button"
                        prefix={
                          <i className="fas fa-birthday-cake text-gray-400"></i>
                        }
                      />
                      <select
                        value={authForm.gender}
                        onChange={(e) =>
                          setAuthForm({ ...authForm, gender: e.target.value })
                        }
                        className="w-full p-2 border border-gray-300 !rounded-button text-gray-600"
                      >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                    </>
                  )}

                  <Input
                    placeholder="Email"
                    value={authForm.email}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, email: e.target.value })
                    }
                    className="!rounded-button"
                    prefix={<i className="fas fa-envelope text-gray-400"></i>}
                  />

                  <Input.Password
                    placeholder="Mật khẩu"
                    value={authForm.password}
                    onChange={(e) =>
                      setAuthForm({ ...authForm, password: e.target.value })
                    }
                    className="!rounded-button"
                    prefix={<i className="fas fa-lock text-gray-400"></i>}
                  />

                  <Button
                    type="primary"
                    block
                    onClick={handleAuth}
                    // loading={loginMutation || registerMutation}
                    className="!rounded-button whitespace-nowrap cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 border-0 h-auto py-2"
                  >
                    {authMode === "login" ? "Đăng Nhập" : "Đăng Ký"}
                  </Button>

                  <div className="text-center mt-4">
                    <button
                      onClick={() =>
                        setAuthMode(authMode === "login" ? "register" : "login")
                      }
                      className="text-pink-600 hover:text-pink-700 text-sm"
                    >
                      {authMode === "login"
                        ? "Chưa có tài khoản? Đăng ký ngay"
                        : "Đã có tài khoản? Đăng nhập"}
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
