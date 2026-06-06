export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl m-4 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modals header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* content */}
        <div className="mt-2 text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}