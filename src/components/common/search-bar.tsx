import { forwardRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/common/vectors";

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  clearable?: boolean;
};

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ clearable = false, value, onChange, className, ...props }, ref) => {
    const isControlled = value !== undefined;
    const [innerValue, setInnerValue] = useState("");

    const currentValue = isControlled ? value : innerValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInnerValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInnerValue("");

      onChange?.({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          value={currentValue}
          onChange={handleChange}
          className={`bg-section placeholder:text-inactive h-10 w-full rounded-lg pl-10 ${
            clearable ? "pr-10" : "pr-3"
          } text-large outline-none ${className ?? ""}`}
          placeholder="Tìm kiếm"
          {...props}
        />

        <SearchIcon className="absolute left-2 top-2 text-icon-tertiary" />

        {clearable && currentValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-1 top-1/2 flex h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-sm transition hover:bg-primary/80 active:scale-95"
          >
            <CloseIcon color="white" size={10} strokeWidth={3} />
          </button>
        )}
      </div>
    );
  },
);

export default SearchBar;
