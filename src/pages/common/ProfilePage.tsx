import { useQuery } from "@tanstack/react-query";
import { getProfileUser } from "../../common/api/userApi";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["USERS", userId],
    queryFn: () => getProfileUser(userId!),
    enabled: !!userId, // chỉ gọi khi có userId
  });

  // dữ liệu thực tế có thể nằm trong data.data
  const user = data?.data || data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin>Đang tải...</Spin>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Không thể tải hồ sơ người dùng</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-16 px-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg p-8">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          {user?.photos?.[0] && (
            <img
              src={user.photos[0]}
              alt={user.username}
              className="w-32 h-32 rounded-full shadow-md mb-4 object-cover"
            />
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            {user.username}, {user.age}
          </h1>
          <p className="text-gray-500 mb-4">{user.location}</p>
          <p className="text-gray-700 text-center mb-6">{user.bio}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={`/profile/edit/${user._id}`}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium shadow-md hover:shadow-lg transition"
            >
              Chỉnh Sửa Hồ Sơ
            </Link>
            <Link
              to={"/settings"}
              className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 font-medium shadow-md hover:bg-gray-200 transition"
            >
              Cài Đặt
            </Link>
            <button className="px-6 py-2 rounded-full bg-yellow-400 text-white font-medium shadow-md hover:bg-yellow-500 transition">
              Nâng Cấp Premium
            </button>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Sở thích</h3>
            <div className="flex flex-wrap gap-2">
              {user?.interests?.length ? (
                user.interests.map((interest: string, index: number) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 text-sm">Chưa có sở thích</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Thông tin khác</h3>
            <p className="text-gray-600 text-sm">Email: {user.email}</p>
            <p className="text-gray-600 text-sm">Điện thoại: {user.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
