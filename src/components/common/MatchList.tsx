import { useState } from "react";
import { Avatar } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const MatchList = ({ matches, selectedChat, setSelectedChat }: any) => {
  const [photoIndexes, setPhotoIndexes] = useState<{ [key: string]: number }>(
    {}
  );
  const handlePrev = (matchId: string, photosLength: number) => {
    setPhotoIndexes((prev) => {
      const currentIndex = prev[matchId] ?? 0;
      const newIndex = (currentIndex - 1 + photosLength) % photosLength;
      return { ...prev, [matchId]: newIndex };
    });
  };

  const handleNext = (matchId: string, photosLength: number) => {
    setPhotoIndexes((prev) => {
      const currentIndex = prev[matchId] ?? 0;
      const newIndex = (currentIndex + 1) % photosLength;
      return { ...prev, [matchId]: newIndex };
    });
  };

  return (
    <div className="p-4 space-y-2">
      {matches?.map((match: any) => {
        const photos = match.user.photos || [];
        const currentIndex = photoIndexes[match.matchId] ?? 0;

        return (
          <div
            key={match.matchId}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedChat === match.matchId
                ? "bg-pink-50 border border-pink-200"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedChat(match.matchId)}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar
                  src={photos[currentIndex]}
                  size={48}
                  shape="circle"
                  className="object-cover"
                />
                {photos.length > 1 && (
                  <>
                    <button
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev(match.matchId, photos.length);
                      }}
                    >
                      <LeftOutlined className="text-gray-600" />
                    </button>
                    <button
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext(match.matchId, photos.length);
                      }}
                    >
                      <RightOutlined className="text-gray-600" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate flex items-center">
                  {match.user.username}
                </h4>
              </div>
            </div>
          </div>
        );
      })}

      {matches && matches.length === 0 && (
        <p className="p-4 text-gray-500">No matches yet</p>
      )}
    </div>
  );
};

export default MatchList;
