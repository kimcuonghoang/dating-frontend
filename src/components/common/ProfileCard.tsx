import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Button } from "antd";
import { CloseOutlined, HeartOutlined } from "@ant-design/icons";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProfileCard = ({ currentUser, handleSwipeUser }: any) => {
  const photos = currentUser?.photos?.length
    ? currentUser.photos
    : ["/default-avatar.png"];

  return (
    <div className="card-stack max-w-sm w-full">
      <div className="profile-card bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Ảnh + Swiper */}
        <div className="h-96 relative overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true, type: "progressbar" }}
            loop
            className="h-full w-full"
          >
            {photos.map((photo: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={photo}
                  alt={currentUser?.username || "No name"}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Nội dung */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentUser.username} {currentUser.age}
          </h2>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            {currentUser.bio}
          </p>

          {currentUser?.interests?.length ? (
            currentUser.interests.map((interest: string, index: number) => (
              <span
                key={index}
                className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm mr-2"
              >
                {interest}
              </span>
            ))
          ) : (
            <p className="text-gray-400">Chưa có sở thích</p>
          )}

          {/* Nút Like/Pass */}
          <div className="flex justify-center space-x-4 mt-6">
            <Button
              shape="circle"
              size="large"
              className="!rounded-button !w-14 !h-14 !border-2 !border-gray-300"
              onClick={() => handleSwipeUser("pass")}
            >
              <CloseOutlined className="text-xl text-gray-500" />
            </Button>
            <Button
              shape="circle"
              size="large"
              className="!rounded-button !w-14 !h-14 !bg-gradient-to-r !from-pink-500 !to-red-500 !border-0"
              onClick={() => handleSwipeUser("like")}
            >
              <HeartOutlined className="text-2xl text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
