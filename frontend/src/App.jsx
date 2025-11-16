import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SettingModal from "./components/SettingModal";
import Home from "./pages/Home";

export default function App() {
  const [openSettings, setOpenSettings] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="relative min-h-screen transition-all duration-500 ease-in-out">
      <Sidebar
        onOpenSettings={() => setOpenSettings(true)}
        onToggle={(val) => setSidebarExpanded(val)}
      />

      <div
        className={`transition-all duration-500 ease-in-out ${
          sidebarExpanded ? "ml-56" : "ml-20"
        }`}
      >
        <Navbar />
        <Home />
      </div>

      <SettingModal
        isOpen={openSettings}
        onClose={() => setOpenSettings(false)}
      />
    </div>
  );
}
