import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const timeBasedGreetings = {
    morning: [
      "Good morning, User ☀️",
      "Hope you slept well 😴",
      "A beautiful morning to start fresh!",
    ],
    afternoon: [
      "Good afternoon 🌤️",
      "Keep going, you’re doing great 💪",
      "It’s a good day to stay positive ☀️",
    ],
    evening: [
      "Good evening 🌙",
      "You’ve done well today 🫶",
      "Let’s take it easy tonight 😌",
    ],
  };

  const [greet, setGreet] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    let greetings;

    if (hour >= 5 && hour < 12) greetings = timeBasedGreetings.morning;
    else if (hour >= 12 && hour < 18) greetings = timeBasedGreetings.afternoon;
    else greetings = timeBasedGreetings.evening;

    const random = greetings[Math.floor(Math.random() * greetings.length)];
    setGreet(random);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Tambah pesan user dulu biar langsung muncul
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", {
        message: userMessage,
      });

      const botReply = res.data.response;

      // respon dari backend
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Maaf, terjadi kesalahan di server 😞" },
      ]);
    }
  };

  // Scroll otomatis ke bawah setiap ada pesan baru
  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col justify-between h-[calc(100vh-64px)] px-6 py-6 dark:bg-gray-950 bg-gray-50 transition-all duration-500">
      {/* Greeting */}
      <div
        className={`flex flex-col items-center text-center mb-6 transition-all duration-500 ${
          messages.length > 0 ? "mt-2" : "flex-grow justify-center"
        }`}
      >
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          {greet}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          I’m here to listen anytime you need 💬
        </p>
      </div>

      {/* Chat Messages */}
      <div className="chat-container flex flex-col gap-3 max-w-2xl mx-auto w-full overflow-y-auto flex-1 mb-4 transition-all duration-500">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`px-4 py-2 rounded-2xl max-w-[75%] ${
              msg.sender === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-3 w-full max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Ketik pesan di sini..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <button
          onClick={handleSend}
          className="px-5 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
