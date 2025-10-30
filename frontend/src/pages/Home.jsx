export default function Home() {
  return (
    <div className="flex flex-col justify-between h-full pt-24 pb-8 px-6 dark:bg-gray-950 bg-gray-50">
      {/* Greeting */}
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
          Hello, User 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          How’s your day going today?
        </p>
      </div>

      {/* Input chat */}
      <div className="flex items-center gap-3 w-full max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Ketik pesan di sini..."
          className="flex-1 px-4 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-5 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          Enter
        </button>
      </div>
    </div>
  );
}
