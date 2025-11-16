export default function SettingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 w-96 relative transform animate-slideDown">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Settings ⚙️
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">Dark Mode</span>
            <input type="checkbox" className="toggle" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300">
              Notifications
            </span>
            <input type="checkbox" className="toggle" />
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
