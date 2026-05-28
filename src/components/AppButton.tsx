import React from "react";

type AppButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
};

export default function AppButton({
  children,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary", // for CSS styling
}: AppButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`app-button ${variant}`}
    >
      {children}
    </button>
  );
}
