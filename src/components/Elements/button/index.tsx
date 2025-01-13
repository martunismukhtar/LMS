"use client";

type Props = {
  className?: string;
  children?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};
const Button = (props: Props) => {
  const {
    children = "...",
    className = "border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
    type = "button",
    onClick = () => {},
  } = props;
  return (
    <button
      className={`${className} px-4 py-2 rounded`}
      type={`${type}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
