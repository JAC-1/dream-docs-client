type ButtonProps = {
  buttonTitle: string;
  isProcessing: boolean | null;
  handleClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  buttonTitle,
  isProcessing,
  handleClick,
  disabled = false,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={(disabled || isProcessing) ?? false}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-busy={isProcessing ?? false}
      aria-label={buttonTitle}
      tabIndex={0}
    >
      {isProcessing ? "Processing..." : buttonTitle}
    </button>
  );
};

export default Button;
