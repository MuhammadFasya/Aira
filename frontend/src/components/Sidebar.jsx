import { useState } from "react";
import { Menu, Plus, Search, History, Settings, User } from "lucide-react";

export default function Sidebar({ onOpenSettings }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen ${
        expanded ? "w-56" : "w-20"
      } flex flex-col justify-between items-center bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300`}
    >
      {/* Top */}
      <div className="flex flex-col items-center mt-4 space-y-6 w-full">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-gray-500 hover:text-blue-600"
        >
          <Menu size={22} />
        </button>

        <div className="flex flex-col items-center w-full mt-8 space-y-6">
          <SidebarButton
            icon={<Plus size={22} />}
            label="New Chat"
            expanded={expanded}
          />
          <SidebarButton
            icon={<Search size={22} />}
            label="Search"
            expanded={expanded}
          />
          <SidebarButton
            icon={<History size={22} />}
            label="History"
            expanded={expanded}
          />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center mb-4 w-full space-y-6">
        <SidebarButton
          icon={<Settings size={22} />}
          label="Settings"
          expanded={expanded}
          onClick={onOpenSettings}
        />
        <SidebarButton
          icon={<User size={28} />}
          label="User"
          expanded={expanded}
        />
      </div>
    </aside>
  );
}

function SidebarButton({ icon, label, expanded, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 text-gray-500 hover:text-blue-600 w-full px-4"
    >
      {icon}
      {expanded && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
