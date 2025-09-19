import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message, Spin } from "antd";

import Sidebar from "./Sidebar";
import ChatWindow from "./chat/ChatWindow";
import { getAllUser, getProfileUser } from "../../../common/api/userApi";
import { getMatches } from "../../../common/api/matchApi";
import { getMessage } from "../../../common/api/messageApi";
import { socket } from "../../../common/middlewares/socket";
import { likeUser } from "../../../common/api/likeApi";
import ProfileCard from "../../../components/common/ProfileCard";

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const userId = localStorage.getItem("userId");

  const { data: user, isLoading: loadingUserProfile } = useQuery({
    queryKey: ["USER"],
    queryFn: () => getProfileUser(userId!),
    enabled: !!userId,
  });
  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["USERS"],
    queryFn: () => getAllUser(),
  });
  const { data: matches, isLoading: loadingMatches } = useQuery({
    queryKey: ["MATCHES", userId],
    queryFn: () => getMatches(userId!),
    enabled: !!userId,
  });
  const { data: getMS, isLoading: loadingMessages } = useQuery({
    queryKey: ["MESSAGES", selectedChat],
    queryFn: () => getMessage(selectedChat!),
    enabled: !!selectedChat,
  });

  // update tin nhắn khi query về
  useEffect(() => {
    if (getMS) setMessages(getMS);
  }, [getMS]);

  // socket join room
  useEffect(() => {
    if (!selectedChat) return;
    socket.emit("joinRoom", selectedChat);
    const handler = (msg: any) => {
      if (msg.matchId === selectedChat) setMessages((prev) => [...prev, msg]);
    };
    socket.on("receiveMessage", handler);
    return () => {
      socket.emit("leaveRoom", selectedChat);
      socket.off("receiveMessage", handler);
    };
  }, [selectedChat]);

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
    if (action === "like") likeMutation.mutate(currentUser._id);
    setCurrentUserIndex((prev) => (prev + 1 < users.length ? prev + 1 : 0));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;
    const newMsg = {
      matchId: selectedChat,
      senderId: userId,
      content: messageInput,
    };
    socket.emit("sendMessage", newMsg);
    setMessageInput("");
  };

  if (loadingUsers || loadingMatches || loadingMessages || loadingUserProfile) {
    return (
      <div className="min-h-[100dvh] flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!users?.length) return <div>Không có user nào để hiển thị.</div>;

  const currentUser = users[currentUserIndex];

  return (
    <div className="min-h-screen flex items-center justify-center from-pink-50 to-white">
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          matches={matches}
          user={user}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
        />

        {/* Main */}
        <div className="flex-1 flex flex-col">
          {activeTab === "discover" && (
            <div className="flex-1 flex items-center justify-center p-4 md:p-8">
              <div className="max-w-sm w-full">
                <ProfileCard
                  currentUser={currentUser}
                  handleSwipeUser={handleSwipeUser}
                />
              </div>
            </div>
          )}
          {activeTab === "matches" && selectedChat && (
            <ChatWindow
              selectedChat={selectedChat}
              matches={matches}
              messages={messages}
              userId={userId!}
              messageInput={messageInput}
              setMessageInput={setMessageInput}
              handleSendMessage={handleSendMessage}
            />
          )}
          {activeTab === "matches" && !selectedChat && (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-pink-50/50 to-white">
              <div className="text-center px-4">
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  Chọn một match để trò chuyện
                </h3>
                <p className="text-gray-500 text-sm">
                  Bắt đầu cuộc trò chuyện với người bạn đã match
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
