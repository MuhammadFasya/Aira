import { useState } from "react";
import { Menu, Plus, Search, History, Settings, User } from "lucide-react";

export default function Sidebar({ onOpenSettings, onToggle }) {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
    onToggle(!expanded);
  };

  return (
    <aside
      className={`absolute top-0 left-0 h-screen ${
        expanded ? "w-56" : "w-20"
      } flex flex-col justify-between bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-500 ease-in-out z-40`}
    >
      {/* Top Section */}
      <div
        className={`flex flex-col ${
          expanded ? "items-start" : "items-center"
        } items-start mt-4 space-y-6 w-full px-4 mx-auto`}
      >
        <button
          onClick={handleToggle}
          className={`text-gray-500 hover:text-blue-600 transition-all duration-500 ${
            expanded ? "translate-x-40" : "translate-x-0"
          }`}
        >
          <Menu size={22} />
        </button>

        <div className="flex flex-col items-center w-full space-y-6 mt-4">
          <SidebarButton
            icon={<Plus size={22} />}
            label="New"
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

      {/* Bottom Section */}
      <div className="flex flex-col items-start mb-4 w-full space-y-6 px-4">
        <SidebarButton
          icon={<Settings size={22} />}
          label="Settings"
          expanded={expanded}
          onClick={onOpenSettings}
        />
        <SidebarButton
          icon={<User size={22} />}
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
      className={`flex items-center gap-3 text-gray-500 hover:text-blue-600 transition-all duration-300 w-full ${
        expanded ? "justify-start" : "justify-center"
      }`}
    >
      {icon}
      {expanded && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
