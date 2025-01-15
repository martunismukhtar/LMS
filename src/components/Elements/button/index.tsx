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
    className = "",
    type = "button",
    onClick = () => {},
  } = props;
  return (
    <button
      className={`${className}`}
      type={`${type}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
