import { Button, Input, message, Modal, Dropdown, MenuProps } from "antd";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authLogin, authRegister } from "../../common/api/authApi";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [userRole, setUserRole] = useState<"guest" | "user" | "admin">("guest");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    username: "",
    age: "",
    gender: "male",
  });
  const [username, setUsername] = useState<string | null>(null);

  // Khi load lại trang, lấy username từ localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) {
      setUsername(savedName);
      setUserRole("user");
    }
  }, []);

  // Mutation login
  const loginMutation = useMutation({
    mutationFn: (data: { email: string; password: string }) => authLogin(data),
    onSuccess: (res) => {
      setUserRole("user");
      setShowAuthModal(false);
      message.success("Đăng nhập thành công!");
      const { accessToken, user } = res.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("username", user.username);
      setUsername(user.username);
    },
    onError: (err: any) => {
      message.error(err.response?.data?.message || "Đăng nhập thất bại!");
    },
  });

  // Mutation register
  const registerMutation = useMutation({
    mutationFn: (data: any) => authRegister(data),
    onSuccess: (res) => {
      setUserRole("user");
      setShowAuthModal(false);
      message.success("Đăng ký thành công!");
      const { user } = res.data.data;
      localStorage.setItem("username", user.username);
      setUsername(user.username);
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
        !authForm.username ||
        !authForm.age
      ) {
        return message.warning("Vui lòng điền đầy đủ thông tin!");
      }
      registerMutation.mutate(authForm);
    }
  };

  // Menu dropdown user
  const userMenu: MenuProps["items"] = [
    {
      key: "profile",
      label: <Link to="/profile">Hồ sơ</Link>,
    },
    {
      key: "settings",
      label: <Link to="/settings">Cài đặt</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <button
          onClick={() => {
            localStorage.clear();
            setUserRole("guest");
            setUsername(null);
            message.info("Đã đăng xuất!");
          }}
          className="w-full text-left"
        >
          Đăng xuất
        </button>
      ),
    },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-heart text-white text-xl"></i>
          </div>
          <Link
            to={"/"}
            className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent"
          >
            LoveConnect
          </Link>
        </div>

        {/* Nav */}
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

          {/* Nếu chưa login thì hiện nút */}
          {userRole === "guest" ? (
            <Button
              type="primary"
              className="!rounded-button !whitespace-nowrap !cursor-pointer !bg-gradient-to-r !from-pink-500 !to-red-500 !border-0"
              onClick={() => setShowAuthModal(true)}
            >
              Bắt Đầu Hẹn Hò
            </Button>
          ) : (
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                  <UserOutlined className="text-white text-lg" />
                </div>
                <span className="font-medium text-gray-700">{username}</span>
              </div>
            </Dropdown>
          )}
        </nav>
      </div>

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
                  value={authForm.username}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, username: e.target.value })
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
              className="!rounded-button !whitespace-nowrap !cursor-pointer !bg-gradient-to-r !from-pink-500 !to-red-500 !border-0 !h-auto !py-2"
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
    </header>
  );
};

export default Header;
