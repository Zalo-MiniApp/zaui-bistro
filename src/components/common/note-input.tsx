import { Input, Text } from "zmp-ui";
import { copy } from "@/constants/copy";
import { cn } from "@/utils/cn";

interface NoteInputProps {
  value?: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  label?: string;
  hideLabel?: boolean;
  className?: string;
}

export default function NoteInput({
  value,
  onChange,
  label,
  maxLength,
  hideLabel,
  placeholder,
  className,
}: NoteInputProps) {
  const MAX = maxLength ?? 40;
  return (
    <div className={cn("m-3 space-y-1", className)}>
      {!hideLabel && (
        <Text size="xSmall" className="text-text-primary">
          {label ?? copy.product.note}
        </Text>
      )}

      <Input.TextArea
        value={value}
        onChange={(e) => onChange?.(e.target.value.slice(0, MAX))}
        maxLength={MAX}
        placeholder={placeholder ?? copy.product.notePlaceholder}
        showCount
        className="h-24 w-full"
      />
    </div>
  );
}
