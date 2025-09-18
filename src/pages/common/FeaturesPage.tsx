import { useEffect, useState } from "react";
import { Button, Input, Avatar, Tabs, message, Spin } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  HeartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../common/api/userApi";
import { getMessage } from "../../common/api/messageApi";
import { likeUser } from "../../common/api/likeApi";
import { getMatches } from "../../common/api/matchApi";
import { socket } from "../../common/middlewares/socket";
import ProfileCard from "../../components/common/ProfileCard";
import MatchList from "../../components/common/MatchList";

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const userId = localStorage.getItem("userId");
  const { data: users, isLoading: loadingUser } = useQuery({
    queryKey: ["USERS"],
    queryFn: () => getAllUser(),
  });

  // Query matches của user
  const { data: matches, isLoading: loadingMatch } = useQuery({
    queryKey: ["MATCHES", userId],
    queryFn: () => getMatches(userId!),
    enabled: !!userId,
  });

  // Gửi like
  const likeMutation = useMutation({
    mutationFn: (id: string) => likeUser(id),
    onSuccess: () => {
      message.success("Đã like người dùng!");
    },
    onError: () => {
      message.error("Like thất bại!");
    },
  });

  const handleSwipeUser = (action: "like" | "pass") => {
    const currentUser = users?.[currentUserIndex];
    if (!currentUser) return;

    if (action === "like") {
      likeMutation.mutate(currentUser._id);
    }

    setCurrentUserIndex((prev) => (prev + 1 < users.length ? prev + 1 : 0));
  };

  const { data: getMS, isLoading: loadingMS } = useQuery({
    queryKey: ["MESSAGES", selectedChat],
    queryFn: () => getMessage(selectedChat!),
    enabled: !!selectedChat,
    refetchOnMount: true,
  });

  useEffect(() => {
    if (getMS) setMessages(getMS);
  }, [getMS]);

  // Lấy tin nhắn khi chọn chat
  useEffect(() => {
    if (!selectedChat) return;
    // join room
    socket.emit("joinRoom", selectedChat);

    const handleReceiveMessage = (msg: any) => {
      if (msg.matchId === selectedChat) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.emit("leaveRoom", selectedChat);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [selectedChat]);

  // Gửi tin nhắn
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    if (!selectedChat) {
      message.warning("Chọn một match để trò chuyện!");
      return;
    }

    const newMsg = {
      matchId: selectedChat,
      senderId: userId,
      content: messageInput,
    };

    socket.emit("sendMessage", newMsg);
    setMessageInput("");
  };

  // loading
  if (loadingUser || loadingMatch || loadingMS) {
    return <Spin>Loading...</Spin>;
  }
  if (!users || users.length === 0) {
    return <div>Không có user nào để hiển thị.</div>;
  }

  const currentUser = users[currentUserIndex];
  const photoUrl = currentUser?.photos?.[0] || "/default-avatar.png";

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
            <div className="flex items-center space-x-2"></div>
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
                    <span>Match ({matches?.length ?? 0})</span>
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
            <MatchList
              matches={matches}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
            />
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
              <ProfileCard
                currentUser={currentUser}
                handleSwipeUser={handleSwipeUser}
              />
            </div>
          </div>
        ) : selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <Avatar
                  src={
                    matches.find((m: any) => m.matchId === selectedChat)?.user
                      ?.photos?.[0]
                  }
                  size={40}
                />
                <h3 className="font-medium text-gray-900">
                  {
                    matches.find((m: any) => m.matchId === selectedChat)?.user
                      ?.username
                  }
                </h3>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-pink-50/50 to-white">
              <div className="space-y-4">
                {messages.map((msg: any, idx) => {
                  const sender = msg.senderId?._id || msg.senderId;
                  const isMine = sender?.toString() === userId?.toString();

                  return (
                    <div
                      key={idx}
                      className={`flex ${
                        isMine ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-4 py-3 max-w-xs rounded-2xl shadow-sm ${
                          isMine
                            ? "bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-br-md"
                            : "bg-white border border-pink-100 text-gray-800 rounded-bl-md"
                        }`}
                      >
                        <p>{msg.content}</p>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {new Date(
                            msg.sendTime || msg.createdAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {!messages.length && (
                  <p className="text-gray-400 text-center">
                    Chưa có tin nhắn nào
                  </p>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
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
                      className="!rounded-button bg-gradient-to-r from-pink-500 to-red-500 border-0"
                      onClick={handleSendMessage}
                    />
                  }
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-pink-50/50 to-white">
            <div className="text-center">
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
