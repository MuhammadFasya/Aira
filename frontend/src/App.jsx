import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-20 min-h-screen">
        <Navbar />
        <Home />
      </div>
    </div>
  );
}
