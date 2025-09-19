import { Avatar, Button, Input } from "antd";
import { useRef, useEffect } from "react";

interface ChatWindowProps {
  selectedChat: string;
  matches: any[];
  messages: any[];
  userId: string;
  messageInput: string;
  setMessageInput: (val: string) => void;
  handleSendMessage: () => void;
}

const ChatWindow = ({
  selectedChat,
  matches,
  messages,
  userId,
  messageInput,
  setMessageInput,
  handleSendMessage,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  const chatUser = matches.find((m) => m.matchId === selectedChat)?.user;

  return (
    <>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-3 flex items-center gap-3">
        <Avatar src={chatUser?.photos?.[0]} size={36} />
        <h3 className="font-medium text-gray-900 text-sm">
          {chatUser?.username}
        </h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-pink-50/50 to-white">
        <div className="p-4 space-y-3">
          {messages.map((msg, idx) => {
            const sender = msg.senderId?._id || msg.senderId;
            const isMine = sender?.toString() === userId?.toString();
            return (
              <div
                key={idx}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 max-w-[75%] rounded-2xl shadow-sm ${
                    isMine
                      ? "bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-br-md"
                      : "bg-white border border-pink-100 text-gray-800 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span className="text-[10px] text-gray-500 block">
                    {new Date(msg.sendTime || msg.createdAt).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </span>
                </div>
              </div>
            );
          })}
          {!messages.length && (
            <p className="text-gray-400 text-center text-sm">
              Chưa có tin nhắn nào
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Gửi tin nhắn..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onPressEnter={handleSendMessage}
            className="flex-1 rounded-xl border-pink-200 text-sm"
            suffix={
              <Button
                type="primary"
                shape="circle"
                size="small"
                icon={<i className="fas fa-paper-plane"></i>}
                className="!bg-gradient-to-r !from-pink-500 !to-red-500 !border-0 !shadow-md"
                onClick={handleSendMessage}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
