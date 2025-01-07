type Props = {
  message: string;
  type?: "success" | "error" | "info" | undefined;
  onClose: () => void;
}
// { message, type, onClose }
const Toast = (props:Props) => {
  const { message, type, onClose } = props;
  // Warna berdasarkan tipe (success, error, info)
  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white"
  };

  return (
    <div
      className={`fixed top-4 right-4 flex items-center gap-4 p-4 rounded shadow-lg transition-transform duration-300 z-[99] ${
        type ? typeStyles[type] :"bg-gray-500 text-white"
      }`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-300 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
