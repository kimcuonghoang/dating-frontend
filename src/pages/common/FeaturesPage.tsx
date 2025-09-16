import React from "react";
import {
  Button,
  Input,
  Card,
  Avatar,
  Badge,
  Tabs,
  Table,
  Switch,
  Modal,
  message,
} from "antd";
import {
  UserOutlined,
  MessageOutlined,
  SearchOutlined,
  SettingOutlined,
  BarChartOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  BlockOutlined,
  HeartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
const FeaturesPage = () => {
  return (
    <div className="h-screen flex bg-gray-50">
      <style>{`
.!rounded-button {
border-radius: 12px;
}
body {
min-height: 1024px;
}
.card-stack {
perspective: 1000px;
}
.profile-card {
transform-style: preserve-3d;
transition: transform 0.3s ease;
}
.profile-card:hover {
transform: rotateY(5deg);
}
`}</style>
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                <i className="fas fa-heart text-white"></i>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                LoveConnect
              </span>
            </div>
            <Button
              type="text"
              icon={<SettingOutlined />}
              className="cursor-pointer"
              onClick={() => setUserRole("guest")}
            />
          </div>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={[
              {
                key: "discover",
                label: (
                  <span className="flex items-center space-x-2">
                    <i className="fas fa-heart"></i>
                    <span>Khám Phá</span>
                  </span>
                ),
              },
              {
                key: "matches",
                label: (
                  <span className="flex items-center space-x-2">
                    <i className="fas fa-comments"></i>
                    <span>Match ({matches.length})</span>
                  </span>
                ),
              },
              {
                key: "profile",
                label: (
                  <span className="flex items-center space-x-2">
                    <UserOutlined />
                    <span>Hồ Sơ</span>
                  </span>
                ),
              },
            ]}
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeTab === "discover" ? (
            <div className="p-4">
              <div className="mb-4">
                <Input
                  placeholder="Tìm kiếm theo khoảng cách, sở thích..."
                  prefix={<SearchOutlined />}
                  className="!rounded-button border-gray-300 text-sm"
                />
              </div>
              <div className="text-center text-gray-500 text-sm mb-4">
                Vuốt trái để bỏ qua, vuốt phải để thích ❤️
              </div>
            </div>
          ) : activeTab === "matches" ? (
            <div className="p-4 space-y-2">
              {matches.map((match) => (
                <div
                  key={match.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedChat === match.id
                      ? "bg-pink-50 border border-pink-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedChat(match.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar src={match.avatar} size={48} />
                      {match.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900 truncate flex items-center">
                          {match.name}
                          <i className="fas fa-heart text-pink-500 ml-2 text-xs"></i>
                        </h4>
                        <span className="text-xs text-gray-500">
                          {match.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {match.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {matches.length === 0 && (
                <div className="text-center py-8">
                  <i className="fas fa-heart text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">Chưa có match nào</p>
                  <p className="text-sm text-gray-400">
                    Hãy thử khám phá thêm hồ sơ!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              <div className="text-center mb-6">
                <Avatar
                  size={100}
                  src="https://readdy.ai/api/search-image?query=professional%20young%20asian%20person%20portrait%20smiling%20confident%20modern%20clean%20background%20high%20quality%20photography&width=200&height=200&seq=myprofile&orientation=squarish"
                />
                <h3 className="text-xl font-semibold mt-4">Tôi, 25 tuổi</h3>
                <p className="text-gray-500">Hà Nội</p>
              </div>
              <div className="space-y-4">
                <Button
                  block
                  className="!rounded-button cursor-pointer whitespace-nowrap text-left justify-start"
                  icon={<i className="fas fa-edit"></i>}
                >
                  Chỉnh Sửa Hồ Sơ
                </Button>
                <Button
                  block
                  className="!rounded-button cursor-pointer whitespace-nowrap text-left justify-start"
                  icon={<i className="fas fa-cog"></i>}
                >
                  Cài Đặt
                </Button>
                <Button
                  block
                  className="!rounded-button cursor-pointer whitespace-nowrap text-left justify-start"
                  icon={<i className="fas fa-crown"></i>}
                >
                  Nâng Cấp Premium
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {activeTab === "discover" ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="card-stack max-w-sm w-full">
              <div className="profile-card bg-white rounded-3xl shadow-2xl overflow-hidden relative">
                <div className="h-96 relative overflow-hidden">
                  <img
                    src={mockProfiles[currentUserIndex].photos[0]}
                    alt={mockProfiles[currentUserIndex].name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                    <i className="fas fa-map-marker-alt text-pink-500 mr-1"></i>
                    {mockProfiles[currentUserIndex].distance}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {mockProfiles[currentUserIndex].name},{" "}
                        {mockProfiles[currentUserIndex].age}
                      </h2>
                      <p className="text-gray-500 flex items-center">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        {mockProfiles[currentUserIndex].location}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {mockProfiles[currentUserIndex].bio}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mockProfiles[currentUserIndex].interests.map(
                      (interest, index) => (
                        <span
                          key={index}
                          className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      )
                    )}
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button
                      shape="circle"
                      size="large"
                      className="!rounded-button cursor-pointer w-14 h-14 border-2 border-gray-300 hover:border-gray-400"
                      onClick={() => handleSwipeUser("pass")}
                    >
                      <CloseOutlined className="text-xl text-gray-500" />
                    </Button>
                    <Button
                      shape="circle"
                      size="large"
                      className="!rounded-button cursor-pointer w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 border-0 hover:from-pink-600 hover:to-red-600"
                      onClick={() => handleSwipeUser("like")}
                    >
                      <HeartOutlined className="text-2xl text-white" />
                    </Button>
                    <Button
                      shape="circle"
                      size="large"
                      className="!rounded-button cursor-pointer w-14 h-14 border-2 border-blue-300 hover:border-blue-400"
                    >
                      <i className="fas fa-star text-xl text-blue-500"></i>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <Avatar
                  src={matches.find((m) => m.id === selectedChat)?.avatar}
                  size={40}
                />
                <div>
                  <h3 className="font-medium text-gray-900 flex items-center">
                    {matches.find((m) => m.id === selectedChat)?.name}
                    <i className="fas fa-heart text-pink-500 ml-2 text-xs"></i>
                  </h3>
                  <p className="text-sm text-green-500">Đang hoạt động</p>
                </div>
              </div>
            </div>
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-pink-50/50 to-white">
              <div className="text-center mb-6">
                <div className="bg-white rounded-2xl p-4 shadow-sm inline-block">
                  <i className="fas fa-heart text-pink-500 text-2xl mb-2"></i>
                  <p className="text-sm text-gray-600">
                    Bạn và {matches.find((m) => m.id === selectedChat)?.name} đã
                    match!
                  </p>
                  <p className="text-xs text-gray-500">
                    Hãy bắt đầu cuộc trò chuyện
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 max-w-xs shadow-sm border border-pink-100">
                    <p className="text-gray-800">
                      Chào bạn! Rất vui được match với bạn 😊
                    </p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      10:30
                    </span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl rounded-br-md px-4 py-3 max-w-xs">
                    <p>
                      Chào bạn! Mình cũng rất vui. Bạn có thích du lịch không?
                    </p>
                    <span className="text-xs text-pink-100 mt-1 block">
                      10:32
                    </span>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 max-w-xs shadow-sm border border-pink-100">
                    <p className="text-gray-800">
                      Có chứ! Mình rất thích khám phá những địa điểm mới. Bạn đã
                      đi đâu gần đây chưa?
                    </p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      10:35
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <Button
                  type="text"
                  icon={<i className="fas fa-camera"></i>}
                  className="cursor-pointer text-pink-500"
                />
                <Input
                  placeholder="Gửi tin nhắn..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onPressEnter={handleSendMessage}
                  className="flex-1 !rounded-button border-pink-200 text-sm"
                  suffix={
                    <Button
                      type="primary"
                      shape="circle"
                      size="small"
                      icon={<i className="fas fa-paper-plane"></i>}
                      className="!rounded-button cursor-pointer bg-gradient-to-r from-pink-500 to-red-500 border-0"
                      onClick={handleSendMessage}
                    />
                  }
                />
                <Button
                  type="text"
                  icon={<i className="fas fa-heart"></i>}
                  className="cursor-pointer text-pink-500"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-pink-50/50 to-white">
            <div className="text-center">
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-4xl text-pink-400"></i>
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                Chọn một match để trò chuyện
              </h3>
              <p className="text-gray-500">
                Bắt đầu cuộc trò chuyện với người bạn đã match
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesPage;
