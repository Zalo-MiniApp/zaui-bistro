interface QuantityStepperProps {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "default" | "rounded";
  displaySuffix?: string;
  className?: string;
}

export default function QuantityStepper({
  value,
  onDecrease,
  onIncrease,
  minValue = 0,
  maxValue,
  disabled = false,
  size = "medium",
  variant = "default",
  displaySuffix = "",
  className = "",
}: QuantityStepperProps) {
  const isDecreaseDisabled = disabled || value <= minValue;
  const isIncreaseDisabled =
    disabled || (maxValue !== undefined && value >= maxValue);

  const sizeClasses = {
    small: {
      button: "w-6 h-6 text-lg",
      display: "w-8 text-center text-sm",
    },
    medium: {
      button: "w-7 h-7 text-base",
      display: "text-center text-base font-normal",
    },
    large: {
      button: "w-8 h-8 text-lg",
      display: "w-8 text-center text-base",
    },
  };

  const variantClasses = {
    default: "border border-divider01 rounded-lg px-3 py-2",
    rounded: "gap-2",
  };

  const buttonBaseClasses =
    variant === "rounded"
      ? "rounded-full bg-neutral500 flex items-center justify-center hover:bg-neutral100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      : "flex items-center justify-center";

  return (
    <div
      className={`flex items-center ${variantClasses[variant]} ${className}`}
    >
      <button
        onClick={onDecrease}
        disabled={isDecreaseDisabled}
        className={`${buttonBaseClasses} ${sizeClasses[size].button}`}
      >
        <span>-</span>
      </button>
      <span
        className={`${sizeClasses[size].display} text-normal text-text-secondary`}
      >
        {value}
        {displaySuffix}
      </span>
      <button
        onClick={onIncrease}
        disabled={isIncreaseDisabled}
        className={`${buttonBaseClasses} ${sizeClasses[size].button}`}
      >
        <span>+</span>
      </button>
    </div>
  );
}
