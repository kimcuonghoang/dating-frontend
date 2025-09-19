import { Tabs, Input, Avatar, Button } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";
import MatchList from "../../../components/common/MatchList";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (key: string) => void;
  matches: any[];
  user: any;
  selectedChat: string | null;
  setSelectedChat: (id: string | null) => void;
}

const Sidebar = ({
  activeTab,
  setActiveTab,
  matches,
  user,
  selectedChat,
  setSelectedChat,
}: SidebarProps) => {
  return (
    <div className="hidden md:flex w-72 lg:w-80 border-r border-gray-200 flex-col">
      {/* Tabs */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: "discover",
              label: (
                <span className="flex items-center gap-2">
                  <i className="fas fa-heart text-pink-500" />
                  Khám Phá
                </span>
              ),
            },
            {
              key: "matches",
              label: (
                <span className="flex items-center gap-2">
                  <i className="fas fa-comments text-blue-500" />
                  Match ({matches?.length ?? 0})
                </span>
              ),
            },
            {
              key: "profile",
              label: (
                <span className="flex items-center gap-2">
                  <UserOutlined /> Hồ Sơ
                </span>
              ),
            },
          ]}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "discover" && (
          <div className="p-4">
            <Input
              placeholder="Tìm kiếm theo khoảng cách, sở thích..."
              prefix={<SearchOutlined />}
              className="rounded-xl border-gray-300 text-sm"
            />
            <p className="text-center text-gray-500 text-xs mt-4">
              Vuốt trái để bỏ qua, vuốt phải để thích ❤️
            </p>
          </div>
        )}

        {activeTab === "matches" && (
          <MatchList
            matches={matches}
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
          />
        )}

        {activeTab === "profile" && user && (
          <div className="p-6 text-center">
            <Avatar size={80} src={user.photos?.[0]} />
            <h3 className="text-lg font-semibold mt-4">{user.username}</h3>
            <p className="text-gray-500 text-sm">{user.location}</p>

            <div className="space-y-3 mt-6">
              <Button
                block
                className="rounded-xl flex items-center gap-2 text-sm"
              >
                <i className="fas fa-edit text-pink-500" /> Chỉnh Sửa Hồ Sơ
              </Button>
              <Button
                block
                className="rounded-xl flex items-center gap-2 text-sm"
              >
                <i className="fas fa-cog text-gray-500" /> Cài Đặt
              </Button>
              <Button
                block
                className="rounded-xl flex items-center gap-2 text-sm"
              >
                <i className="fas fa-crown text-yellow-500" /> Nâng Cấp Premium
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
